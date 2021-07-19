const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");

const wrapAsync = require("../utils/wrapAsync");

exports.addItemController = wrapAsync(async(req,res) => {

    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    
    const cart = await Cart.findById(req.user._id);
    if(cart){
        
        cart.userId = req.user._id;
        cart.products.push({ name:product[name], 
            slug:product[slug], 
            quantity, 
            price: product[price] });
    } else{
        const cart = new Cart({
            userId : req.user._id,
            products: [{ name:product[name], 
                slug:product[slug], 
                quantity, 
                price: product[price] }]
        });
    }
    cart = await cart.save();
    res.status(201).json(cart);
})

exports.removeItemController = wrapAsync(async(req,res) => {

    const { productId } = req.params;
    await Cart.findByIdAndUpdate(req.user._id, { $pull : { products: productId }});
    res.send('Successfully Deleted Item');
})

exports.updateItemController = wrapAsync(async(req,res) => {

    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(req.user._id);
    if(!cart){
        return res.status(400).json({
            error: "Your cart has expired!",
        });
    }
    const itemIndex = cart.products.findIndex(p => p._id == productId);
    const productItem = cart.products[itemIndex];
    productItem.quantity = quantity;
    cart.products[itemIndex] = productItem;
    cart = await cart.save();  
})

