const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const {
	getCart,
	addOneItemController,
	removeOneItemController,
	removeItemController

} = require("../controllers/cart.controller");

router.get("/", wrapAsync(getCart));

router.post( "/:productId", wrapAsync(addOneItemController))
	.delete("/:productId", wrapAsync(removeOneItemController));

router.delete("/entire/:productId", wrapAsync(removeItemController));

module.exports = router;
