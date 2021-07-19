const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
	{
        userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        active: 
        {
            type: Boolean,
            default: true,
        },
        modifiedOn: 
        {
            type: Date,
            default: Date.now,
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
            },
        ],
        total: 
        {
            default: 0,
            type: Number,
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);