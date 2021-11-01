// const = require("express-async-handler");
const Order = require("../models/Order.model.js");
const Product = require("../models/Product.model");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = async (req, res) => {
	const { products } = req.body;
	console.log(products);

	var quantity = [];

	if (products && products.length === 0) {
		return res.status(400).json("No order items");
	} else {
		var total = 0;
		var productArray = [];
		for (let i = 0; i < products.length; i++) {
			const product = await Product.findOne({ _id: products[i].product });
			console.log(
				"-------------------------------------------------------"
			);
			quantity.push(parseInt(products[i].qty));
			console.log("Product: ", quantity);
			console.log(
				"-------------------------------------------------------"
			);
			productArray.push(product);
			total += products[i].price;
		}
		console.log(quantity);
		total = 0.9 * total;
		var shipping = 0;
		if (total >= 500) {
			shipping = 50;
		}

		const order = new Order({
			user: req.user._id,
			total,
			shipping,
			products: productArray,
			quantity: quantity,
		});

		try {
			const createdOrder = await order.save();

			res.status(201).json(createdOrder);
		} catch (err) {
			// console.log(err);
			res.status(500).json("Error Occured. Try again later!");
		}
	}
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
};

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();

		res.status(200).json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
	var orders = await Order.find({ user: req.user._id });
	var finalOrders = [];
	console.log("Orders ", orders);
	for (var i = 0; i < orders.length; i++) {
		var productArray = [];
		for (var j = 0; j < orders[i].products.length; j++) {
			const product = await Product.findOne({
				_id: orders[i].products[j],
			});
			productArray.push(product);
		}
		finalOrders.push({
			total: orders[i].total,
			shipping: orders[i].shipping,
			quantity: orders[i].quantity,
			created_at: orders[i].created_at,
			products: productArray,
		});
	}
	console.log(finalOrders);
	res.status(200).json({ orders: finalOrders });
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res) => {
	const orders = await Order.find({}).populate("user", "id name");
	res.json(orders);
};
