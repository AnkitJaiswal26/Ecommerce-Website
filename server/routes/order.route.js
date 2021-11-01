const express = require("express");
const router = express.Router();
const {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
} = require("../controllers/order.controller");
const verify = require("../helpers/verifyToken");

// const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", verify, addOrderItems);
router.get("/myorders", verify, getMyOrders);
router.get("/:id", verify, getOrderById);
router.put("/:id/pay", verify, updateOrderToPaid);

module.exports = router;
