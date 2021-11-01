const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");

// Returns the user's current cart
exports.getCart = async (req, res) => {
	console.log("Hii")
	const cart = await Cart.findOne({ userId: req.body.user._id });
	return res.status(200).json({
		cart,
	});
};

exports.addOneItemController = async (req, res) => {
	const { productId } = req.params;
	const product = await Product.findById(productId);
	const cart = await Cart.findOne({ userId: req.body.user._id });

	if (cart) {
		const itemIndex = cart.products.findIndex(
			(p) => p.product == productId
		);
		if (itemIndex > -1) {
			cart.products[itemIndex].quantity += 1;
		} else {
			cart.products.push({
				product: product._id,
				name: product.product_name,
				image: product.image,
				price: product.retail_price,
				brand: product.brand,
				quantity: 1,
			});
		}

		cart.total += parseInt(product.retail_price);
		await cart.save();
		res.status(200).json({ cart });
	} else {
		const newCart = new Cart({
			userId: req.body.user._id,
			products: [
				{
					product: product._id,
					name: product.product_name,
					image: product.image,
					price: product.retail_price,
					brand: product.brand,
					quantity: 1,
				},
			],
			total: parseInt(product.retail_price),
		});
		await newCart.save();
		res.status(200).json({ cart });
	}
};

exports.removeOneItemController = async (req, res) => {
	const { productId } = req.params;
	const cart = await Cart.findOne({ userId: req.body.user._id });
	const itemIndex = cart.products.findIndex((p) => p.product == productId);

	if (itemIndex > -1) {
		const productItem = cart.products[itemIndex];
		productItem.quantity -= 1;
		cart.total -= parseInt(productItem.price);

		if (productItem.quantity == 0) {
			cart.products.splice(itemIndex);
		}

		await cart.save();
		return res.json({ cart });
	} else {
		return res.json({ error: "Item Not Found" });
	}
};

exports.removeItemController = async (req, res) => {
	const { productId } = req.params;
	const cart = await Cart.findOne({ userId: req.body.user._id });

	const itemIndex = cart.products.findIndex((p) => p.product == productId);

	if (itemIndex > -1) {
		const productItem = cart.products[itemIndex];
		cart.total -= productItem.quantity * productItem.price;
		cart.products.splice(itemIndex);
		await cart.save();
		return res.json({ cart });
	} else {
		return res.json({ error: "Item Not Found" });
	}
};
