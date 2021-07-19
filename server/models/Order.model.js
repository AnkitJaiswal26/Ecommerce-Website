const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
        user: 
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        total: 
        {
            type: Number,
            required: true,
        },
        shipping: 
        {
            type: Number,
            required: true,
        },
        products: [
            {
                name: {
                    type: String,
                },
                slug: {
                    type: String,
                },
                quantity: {
                    type: Number,
                },
                price: {
                    type: Number,
                },
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
            },
        ],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);