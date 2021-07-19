const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
	{
        name: 
        {
            type: String,
        },
        slug: 
        {
            type: String,
        },
        quantity: 
        {
            type: Number,
            required: true,
        },
        reservations: [
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
                createdOn: {
                    type: Date,
                },
            },
        ],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);