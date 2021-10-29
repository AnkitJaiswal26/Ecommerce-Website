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
            product : {
                type: mongoose.Schema.Types.ObjectId,
                ref : "Product"
            },
            name: {
                type: String,
                required : true
            },
            image : {
                type : String,
                required : true
            },
            price : {
                type : String,
                required : true
            },
            brand : {
                type : String,
                required : true
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