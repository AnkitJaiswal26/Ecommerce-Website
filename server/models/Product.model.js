const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		category: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true,
		},
		desc: {
			type: String,
			required: true,
			trim: true,
		},
		productImages: [
			{
				img: {
					type: String,
				},
			},
		],
		ratings: {
			type: Number,
		},
		offer: {
			type: Number,
		},
		quantity: {
			type: Number,
			required: true,
		},
		reviews: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				review: String,
			},
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		updatedAt: Date,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
