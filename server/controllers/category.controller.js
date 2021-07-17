const Category = require("../models/Category.model");
const slugify = require("slugify");
const Product = require("../models/Product.model");
const shortId = require("shortid");
const _ = require("lodash");
const { validationResult } = require("express-validator");

exports.addCategoryController = (req, res) => {
	const { name } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const firstError = errors.array().map((error) => error.msg)[0];
		return res.status(422).json({
			error: firstError,
		});
	} else {
		Category.findOne({
			name: name,
		}).exec((err, category) => {
			if (category) {
				return res.status(400).json({
					errors: "Category already exists",
				});
			}
			if (req.body.parentId) {
				const category = new Category({
					name: name,
					slug: `${slugify(name)}-${shortId.generate()}`,
					parentId: req.body.parentId,
				});
				category.save((err, category) => {
					if (err) {
						return res.status(400).json({
							error: error,
						});
					}
					return res.status(200).json({
						category: category,
					});
				});
			} else {
				const category = new Category({
					name: name,
					slug: `${slugify(name)}-${shortId.generate()}`,
				});
				category.save((err, category) => {
					if (err) {
						return res.status(400).json({
							error: error,
						});
					}
					return res.status(200).json({
						category: category,
					});
				});
			}
		});
	}
};

exports.deleteCategoryController = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const firstError = errors.array().map((error) => error.msg)[0];
		return res.status(400).json({
			error: firstError,
		});
	} else {
		const { name } = req.body;
		Category.findOneAndDelete({ name: name }).exec((err, msg) => {
			if (err) {
				return res.status(400).json({
					error: error,
				});
			}
			return res.status(400).json({
				message: "Category Deleted",
			});
		});
	}
};

function createCategories(categories, parentId = null) {
	const categoryList = [];
	let category;
	if (parentId == null) {
		category = categories.filter((cat) => cat.parentId == undefined);
	} else {
		category = categories.filter((cat) => cat.parentId == parentId);
	}

	for (let cat of category) {
		categoryList.push({
			_id: cat._id,
			name: cat.name,
			slug: cat.slug,
			parentId: cat.parentId,
			type: cat.type,
			children: createCategories(categories, cat._id),
		});
	}

	return categoryList;
}

exports.getAllCategoryController = (req, res) => {
	Category.find({}).exec((error, categories) => {
		if (error) return res.status(400).json({ error });
		if (categories) {
			const categoryList = createCategories(categories);
			res.status(200).json({
				categoryList,
			});
		}
	});
};

exports.getCategoryBySlugController = (req, res) => {
	const { slug } = req.params;

	Category.findOne({ slug: slug }).exec((error, category) => {
		if (error) {
			return res.status(400).json({ error });
		}

		if (category) {
			Product.find({ category: category._id }).exec((error, products) => {
				if (error) {
					return res.status(400).json({ error: error });
				}
				if (products.length > 0) {
					res.status(200).json({
						products,
						priceRange: {
							under500: 500,
							under1k: 1000,
							under2k: 2000,
							under5k: 5000,
							under10k: 10000,
						},
						productsByPrice: {
							under500: products.filter(
								(product) => product.price <= 500
							),
							under1k: products.filter(
								(product) =>
									product.price > 500 && product.price <= 1000
							),
							under2k: products.filter(
								(product) =>
									product.price > 1000 &&
									product.price <= 2000
							),
							under5k: products.filter(
								(product) =>
									product.price > 2000 &&
									product.price <= 5000
							),
							under10k: products.filter(
								(product) =>
									product.price > 5000 &&
									product.price <= 10000
							),
						},
					});
				}
			});
		} else {
			return res.status(400).json({
				error: "No Products found!",
			});
		}
	});
};

exports.updateCategoryController = async (req, res) => {
	const { _id, name, parentId } = req.body;

	const category = {
		name: name,
	};
	if (parentId) {
		category.parentId = parentId;
	}

	Category.findOne(
		{
			_id,
		},
		async (err, category) => {
			if (err || !category) {
				return res.status(400).json({
					error: "Something went wrong. Try again",
				});
			}

			try {
				var updatedFields = {};
				if (name) {
					updatedFields.name = name;
					updatedFields.slug = `${slugify(
						name
					)}-${shortId.generate()}`;
				}
				if (parentId != undefined) updatedFields.parentId = parentId;

				category = _.extend(category, updatedFields);
				category.save((err, result) => {
					if (err) {
						return res.status(400).json({
							error: "Error resetting user password",
						});
					}
					res.json({
						message: `Category Updated Successfully`,
						category: result,
					});
				});
			} catch (err) {
				console.log(err);
				return res.status(401).json({
					errors: "Something went Wrong. Try again later!",
				});
			}
		}
	);
};
