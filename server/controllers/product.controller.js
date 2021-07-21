const { validationResult } = require("express-validator");
const slugify = require("slugify");
const shortId = require("shortid");

// Models
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const User = require("../models/User.model");

exports.addProductController = (req, res) => {
	const { name, price, desc, category, quantity, createdBy } = req.body;

	let productImages = [];

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const firstError = errors.array().map((error) => error.msg)[0];
		return res.status(422).json({
			errors: firstError,
		});
	}

	User.findOne({
		_id: createdBy,
	}).exec((err, user) => {
		if (!user) {
			return res.status(400).json({
				error: "You are not authorized!",
			});
		}
	});

	Category.findOne({
		_id: category,
	}).exec((err, category) => {
		if (!category) {
			return res.status(400).json({
				error: "Invalid Category!",
			});
		}
	});

	if (!req.files) {
		return res.status(400).json({
			error: "Product Image is required",
		});
	}

	if (req.files.length > 0) {
		productImages = req.files.map((file) => {
			return { img: file.location };
		});
	}

	const product = new Product({
		name: name,
		slug: `${slugify(name)}-${shortId.generate()}`,
		price,
		quantity,
		desc: desc,
		productImages,
		category,
		createdBy,
	});

	product.save((err, product) => {
		if (err) {
			console.log("Error!");
			return res.status(400).json({ error: err });
		}
		if (product) {
			res.status(201).json({ product, files: req.files });
		}
	});
};

exports.getAllProductsController = (req, res) => {
	Product.find({ createdBy: req.body.userId })
		.select(
			"_id name price quantity slug description productImages category"
		)
		.populate({ path: "category", select: "_id name" })
		.exec((err, products) => {
			console.log(products);

			if (err) {
				return res.status(400).json({
					error: error,
				});
			}
			return res.status(200).json({
				products,
			});
		});
};

exports.getProductByIdController = (req, res) => {
	if (!req.body.productId) {
		return res.status(400).json({
			error: "Product Id is required!",
		});
	}
	Product.find({ _id: req.body.productId }).exec((err, product) => {
		if (err) {
			return res.status(400).json({
				error: error,
			});
		}
		return res.status(200).json({
			product,
		});
	});
};

exports.deleteProductByIdController = (req, res) => {
	const { productId } = req.body;
	if (productId) {
		Product.deleteOne({ _id: productId }).exec((error, result) => {
			if (error) {
				return res.status(400).json({ error: error });
			}
			if (result) {
				res.status(202).json({
					message: "Product Deleted Successfully!",
				});
			}
		});
	} else {
		res.status(400).json({ error: "Product Id required!" });
	}
};

exports.getProductBySlugController = (req, res) => {
	const { categorySlug, productSlug } = req.params;
	Category.find({
		slug: categorySlug,
	}).exec((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "No Product found!",
			});
		}
		if (category) {
			console.log(category);
			Product.find({
				slug: productSlug,
				category: category._id,
			}).exec((err, product) => {
				if (err) {
					return res.status(400).json({
						error: "No Product found!",
					});
				}
				return res.status(200).json({
					product,
				});
			});
		} else {
			return res.status(400).json({
				error: "Something went wrong! Please try again later!",
			});
		}
	});
};
