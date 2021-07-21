const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
	{
        userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        // active: 
        // {
        //     type: Boolean,
        //     default: true,
        // },
        products: [ {
            _id : false,
            productId : {
                type: mongoose.Schema.Types.ObjectId,
                ref : "Product"
            },
            quantity: {
                type : Number,
                required : true,
                min : [1, "Quantity cannot be less than 1"]
            }
        }],
        total: 
        {
            default: 0,
            type: Number,
        }
	},
	{ timestamps: true }
);


module.exports = mongoose.model("Cart", cartSchema);