
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt');
const User = require("../models/User.model")
const _ = require("lodash")

// Sendgrid mail setup
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

// Validators
const {validationResult} = require('express-validator');

exports.registerController = (req, res) => {
    const {username, email, password, role} = req.body;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const firstError = errors.array().map((error) => error.msg)[0];
			return res.status(422).json({
				errors: firstError,
			});
		} else {
			User.findOne({
				$or: [{email: email}, {username: username}],
			}).exec((err, user) => {
				if (user) {
					return res.status(400).json({
						errors: 'User already exists',
					});
				}

				const token = jwt.sign(
					{
						username,
						email,
						password,
                        role
					},
					process.env.JWT_ACCOUNT_ACTIVATION,
					{
						expiresIn: '5m',
					}
				);
				const emailData = {
					from: process.env.EMAIL_FROM,
					to: email,
					subject: 'Account Activation link',
					html: `
                            <h1>Please use the following to activate your account</h1>
                            <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                            <hr />
                            <p>This email may containe sensetive information</p>
                            <p>${process.env.CLIENT_URL}</p>
                        `,
				};

				sgMail
					.send(emailData)
					.then((sent) => {
						return res.json({
							message: `Email has been sent to ${email}`,
						});
					})
					.catch((err) => {
						return res.status(400).json({
							success: false,
							errors: 'Could not send email\n' + err,
						});
					});
			});
		}
}

exports.activationController = (req, res) => {
	const {token} = req.body;

	if (token) {
		jwt.verify(
			token,
			process.env.JWT_ACCOUNT_ACTIVATION,
			async (err, decoded) => {
				if (err) {
					console.log('Activation err');
					return res.status(401).json({
						errors: 'Expired link. Register Again',
					});
				} else {
					try {
						const {username, email, password, role} = jwt.decode(token);
						const salt = await bcrypt.genSalt(10);
						const hashed_password = await bcrypt.hash(
							password,
							salt
						);

						const user = new User({
							username,
							email,
							password: hashed_password,
                            role: role
						});
						console.log(user);
						user.save((err, user) => {
							if (err) {
								console.log('Save error');
								console.log(err);
								return res.status(401).json({
									errors:
										'Some error occured! Please try again' +
										err,
								});
							} else {
								return res.json({
									success: true,
									message: user,
									message: 'Register Success',
								});
							}
						});
					} catch (err) {
						console.log(err);
						return res.status(401).json({
							errors: 'Some error occured! Please try again',
						});
					}
				}
			}
		);
	} else {
		return res.json({
			message: 'Error happening please try again',
		});
	}
}

exports.loginController = (req, res) => {
    const {email, password} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
            errors: firstError,
        });
    } else {
        User.findOne({
            email: email,
        }).exec(async (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    errors: 'User does not exists. Please register',
                });
            }

            if (!await user.authenticate(password)) {
                return res.status(400).json({
                    errors: 'Email and password do not match',
                });
            }

            const token = jwt.sign(
                {
                    _id: user._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '7d',
                }
            );

            const {
                _id,
                username,
                email,
                profilePicture,
                role,
            } = user;

            return res.json({
                token,
                user: {
                _id,
                username,
                email,
                profilePicture,
                role,
                },
            });
        });
    }
}

exports.forgotPasswordController = (req, res) => {
    const {email} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
            errors: firstError,
        });
    } else {
        User.findOne({
            email: email,
        }).exec((err, user) => {
            if (!user || err) {
                return res.status(400).json({
                    error: 'User does not exists',
                });
            }
            const token = jwt.sign(
                {
                    _id: user._id,
                },
                process.env.JWT_RESET_PASSWORD,
                {
                    expiresIn: '10m',
                }
            );

            const emailData = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: `Password Reset link`,
                html: `
                        <h1>Please use the following link to reset your password</h1>
                        <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                        <hr />
                        <p>This email may contain sensetive information</p>
                        <p>${process.env.CLIENT_URL}</p>
                    `,
            };

            return user.updateOne(
                {
                    resetPasswordLink: token,
                },
                (err, success) => {
                    if (err) {
                        console.log('Reset password link error', err);
                        return res.status(400).json({
                            error: 'Database connection error on user password forgot request',
                        });
                    } else {
                        sgMail
                            .send(emailData)
                            .then((sent) => {
                                return res.json({
                                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
                                });
                            })
                            .catch((err) => {
                                return res.json({
                                    message: err.message,
                                });
                            });
                    }
                }
            );
        });
    }
}

exports.resetPasswordController = (req, res) => {
    const {resetPasswordLink, newPassword} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
            errors: firstError,
        });
    } else {
        if (resetPasswordLink) {
            jwt.verify(
                resetPasswordLink,
                process.env.JWT_RESET_PASSWORD,
                (err, decoded) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Expired link. Try again',
                        });
                    }

                    User.findOne(
                        {
                            resetPasswordLink,
                        },
                        async (err, user) => {
                            if (err || !user) {
                                return res.status(400).json({
                                    error: 'Something went wrong. Try again',
                                });
                            }

                            try {
                                salt = await bcrypt.genSalt(10);
                                const hashed_password = await bcrypt.hash(
                                    newPassword,
                                    salt
                                );

                                const updatedFields = {
                                    password: hashed_password,
                                    resetPasswordLink: '',
                                };

                                user = _.extend(user, updatedFields);
                                user.save((err, result) => {
                                    if (err) {
                                        return res.status(400).json({
                                            error: 'Error resetting user password',
                                        });
                                    }
                                    res.json({
                                        message: `Now you can login with your new password`,
                                    });
                                });
                            } catch(err){
                                console.log(err)
                                return res.status(401).json({
                                    errors: "Something went Wrong. Try again later!"
                                })
                            }
                        }
                    );
                }
            );
        }
    }
}