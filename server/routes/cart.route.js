const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/storage.middleware");
const { check } = require("express-validator");
const {
	addItemController,
	removeItemController,
	updateItemController,
	//cartExpiryController,
} = require("../controllers/cart.controller");

router.post(
	"/",
	[
		check("name", "Name is required").notEmpty(),
		check("price", "Price is required").notEmpty().isNumeric(),
		check("desc", "Description is required").notEmpty(),
		check("category", "Category is required").notEmpty(),
		check("quantity", "Quantity is required").notEmpty().isNumeric(),
	],
	upload.array("productImage"),
	addItemController
);

router.put("/:productId", updateItemController);

// router.get("/all", getAllProductsController);

// router.get("/", getProductByIdController);

router.delete("/:productId", removeItemController);

// router.get("/:categorySlug/:productSlug", getProductBySlugController);

module.exports = router;
