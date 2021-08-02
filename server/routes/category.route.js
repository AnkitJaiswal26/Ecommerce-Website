const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
	addCategoryController,
	deleteCategoryController,
	getAllCategoryController,
	getCategoryBySlugController,
	updateCategoryController,
} = require("../controllers/category.controller");

router.post(
	"/",
	[check("name", "Category name is required").notEmpty()],
	addCategoryController
);

router.delete(
	"/:id",
	deleteCategoryController
);

router.post("/update", updateCategoryController);

router.get("/", getAllCategoryController);

router.get("/:slug", getCategoryBySlugController);

module.exports = router;
