const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");

// Returns the user's current cart
exports.getCart = async(req,res) => {

    const cart = await Cart.findOne({ userId : req.body.user._id }).populate('products.productId', 'name price');
    return res.status(200).json({
        cart })
}

exports.addOneItemController = async(req,res) => {

    const { productId } = req.params;
    const product = await Product.findById(productId);
    console.log(product);
    const cart = await Cart.findOne({ userId : req.body.user._id });
    console.log(cart);
    
    if(cart){

        const itemIndex = cart.products.findIndex(p => p.productId == productId);
        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += 1;
        }else{
            cart.products.push({
                productId,
                quantity: 1
            });
        }
        cart.total += parseInt(product.retail_price);

        await cart.save();
        return res.redirect("/api/cart");
    } else{
        const newCart = new Cart({
            userId : req.body.user._id,
            products: [ {
                productId,
                quantity : 1
            } ],
            total : parseInt(product.retail_price)
        });

        await newCart.save();
        return res.redirect("/api/cart");
    }
}

exports.removeOneItemController = async(req,res) => {

    const { productId } = req.params;
    const cart = await Cart.findOne({ userId : req.body.user._id }).populate('products.productId', 'name price');
    const itemIndex = cart.products.findIndex(p => p.productId._id == productId);

    if (itemIndex > -1) {
        const productItem = cart.products[itemIndex];
        console.log(productItem);
        productItem.quantity -= 1;
        cart.total -= productItem.productId.price;

        if(productItem.quantity == 0){
            cart.products.splice(itemIndex);
        }

        await cart.save();
        return res.redirect('/api/cart');
    } else {
        return res.json( { error : 'Item Not Found'} );
    }
}

exports.removeItemController =  async(req,res) => {

    const { productId } = req.params;
    const cart = await Cart.findOne({ userId : req.body.user._id }).populate('products.productId', 'name price');
    
    const itemIndex = cart.products.findIndex(p => p.productId._id == productId);

    if (itemIndex > -1) {
        
        const productItem = cart.products[itemIndex];
        cart.total -= (productItem.quantity * productItem.productId.price);
        cart.products.splice(itemIndex);
        await cart.save();
        return res.redirect('/api/cart');
    } else {
        return res.json( { error : 'Item Not Found'} );
    } 
}