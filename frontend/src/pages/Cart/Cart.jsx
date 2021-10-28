import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Cart.scss";
import Topbar from "../../components/Topbar/Topbar";
import CartItem from "../../components/cartItem/cartItem";


const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const amount = cart.reduce((total,item) => total + item.qty*item.price,0);
  const discountPercent = 0.1;
  const discount = discountPercent * amount;
  const delivery = amount >= 500 ? 50 : 0;
  const totalAmount = amount - discount + delivery;
  const cartLength = cart.length;
  return (
    <>
      <Topbar/>
      <div id="container">
        <main>
          <h1>MY CART ({cartLength})</h1>
          <hr/>
          {cartLength > 0 ?   
            <>
              { 
                cart.map(item => (
                  <CartItem key={item.product} item={item}/>
                )) 
              }
              <hr/>
              <p class="subtotal">Subtotal({cartLength} {cartLength === 1? 'item':'items'}):  &#8377;{amount}</p>
            </>
             : 
            (
              <div className="empty">
                <p>YOUR CART IS EMPTY</p>
                <Link to="/">
                  <button class="px-6 py-3 border border-transparent rounded-md text-base font-medium text-white">Continue Shopping</button> 
                </Link>
              </div>
            )
          }
        </main>
        {
          cartLength > 0 ? (
            <aside>
              <h1>ORDER DETAILS</h1><hr/>
              <div>
                <div className="order">
                  <p>Amount</p>
                  <p>&#8377;{amount}</p>
                </div>
                <div className="order">
                  <p>Discount</p>
                  <p>&#8377;{discount}</p>
                </div>
                <div className="order">
                  <p>Delivery Charges</p>
                  <p>&#8377; {delivery}</p>
                </div>
              </div>
              <hr/>
              <div className="orderTotal">
                  <p>TOTAL AMOUNT:</p>
                  <p>&#8377;{totalAmount}</p>
              </div>
              <a href="#" class="flex justify-center items-center my-3 px-6 py-3 border border-transparent rounded-md text-base font-medium text-white">Checkout</a>
            </aside>
          ) : ("")
        }
      </div>
    </>
  );
};

export default Cart;
