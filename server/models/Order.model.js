const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		total: {
			type: Number,
			required: true,
		},
		shipping: {
			type: Number,
			required: true,
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		quantity: [
			{
				type: Number,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
