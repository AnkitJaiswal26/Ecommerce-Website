import React from "react";
import "./cartItem.scss";
import { useDispatch } from "react-redux";
import * as cartActions from "../../actions/cart.actions";

export default ({ item }) => {
  
  const dispatch = useDispatch();

  const increase = (id) => () => {
    dispatch(cartActions.increaseByOne(id));
  };

  const decrease = (id) => () => {
    dispatch(cartActions.decreaseByOne(id));
  };

  const remove = (id) => () => {
    dispatch(cartActions.removeFromCart(id));
  }

  return (
    <>
      <div className="item">
        <img src={item.image} alt="" />
        <div className="info">
          <h2>{item.name}</h2>
          <p>Seller : {item.brand}</p>
          <div class="qty">
            <button onClick={decrease(item.product)}>-</button>
            <div class="num">{item.qty}</div>
            <button onClick={increase(item.product)}>+</button>
          </div>
          <button onClick= {remove(item.product)} className="remove">REMOVE</button>
        </div>
        <p className="price">&#8377;{item.qty * item.price}</p>
      </div>
    </>
  );
};
