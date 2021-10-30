const express = require("express");
const verify = require("../helpers/verifyToken");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

router.put("/updatePassword", verify, async (req, res) => {
	if (req.user._id) {
		const user = await User.findOne({
			_id: req.user._id,
		});
		if (
			req.body.oldPassword &&
			(await bcrypt.compare(req.body.oldPassword, user.password))
		) {
			console.log("Hii");
			User.findOne(
				{
					_id: req.user._id,
				},
				async (err, user) => {
					if (err || !user) {
						console.log(err);
						return res.status(400).json({
							error: "Something went wrong. Try again",
						});
					}

					try {
						salt = await bcrypt.genSalt(10);
						const hashed_password = await bcrypt.hash(
							req.body.newPassword,
							salt
						);

						const updatedFields = {
							password: hashed_password,
						};

						user = _.extend(user, updatedFields);
						user.save((err, result) => {
							if (err) {
								return res.status(400).json({
									error: "Error resetting user password",
								});
							}
							res.json({
								message: `Password updated successfully`,
							});
						});
					} catch (err) {
						console.log(err);
						return res.status(400).json({
							error: "Something went Wrong. Try again later!",
						});
					}
				}
			);
		} else {
			console.log(req.body.oldPassword);
			return res.status(400).json({
				error: "Wrong Password!",
			});
		}
	}
});

router.put("/updateEmail", verify, async (req, res) => {
	User.findOne(
		{
			_id: req.user._id,
		},
		async (err, user) => {
			if (err || !user) {
				console.log(err);
				return res.status(400).json({
					error: "Something went wrong. Try again",
				});
			}

			const anotherUser = await User.findOne({ email: req.body.email });

			if (anotherUser && anotherUser._id !== user._id) {
				return res.status(400).json({
					error: "Email already exists! Try another one",
				});
			}

			try {
				const updatedFields = {
					email: req.body.email,
				};

				user = _.extend(user, updatedFields);
				user.save((err, result) => {
					if (err) {
						return res.status(400).json({
							error: "Error updating email",
							user: result,
						});
					}
					res.json({
						message: `Email updated successfully`,
					});
				});
			} catch (err) {
				return res.status(400).json({
					error: "Something went Wrong. Try again later!",
				});
			}
		}
	);
});

module.exports = router;
