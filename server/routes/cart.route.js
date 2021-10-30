const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const {
	getCart,
	addOneItemController,
	removeOneItemController,
	removeItemController

} = require("../controllers/cart.controller");
const verify = require("../helpers/verifyToken");

router.get("/", verify, wrapAsync(getCart));

router.post( "/:productId", verify, wrapAsync(addOneItemController))
	.delete("/:productId", verify, wrapAsync(removeOneItemController));

router.delete("/entire/:productId", wrapAsync(removeItemController));

module.exports = router;
