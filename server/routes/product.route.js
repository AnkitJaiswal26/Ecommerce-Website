const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/storage.middleware");
const { check } = require("express-validator");
const {
	getAllProductsController,
	getProductByIdController,
	deleteProductByIdController,
	getProductBySlugController,
	addProductController,
} = require("../controllers/product.controller");

router.post(
	"/",
	[
		check("name", "Category name is required").notEmpty(),
		check("price", "Price is required").notEmpty().isNumeric(),
		check("desc", "Description is required").notEmpty(),
		check("category", "Category is required").notEmpty(),
		check("quantity", "Quantity is required").notEmpty().isNumeric(),
	],
	upload.array("productImage"),
	addProductController
);

router.get("/all", getAllProductsController);

router.get("/", getProductByIdController);

router.delete("/", deleteProductByIdController);

router.get("/:categorySlug/:productSlug", getProductBySlugController);

module.exports = router;