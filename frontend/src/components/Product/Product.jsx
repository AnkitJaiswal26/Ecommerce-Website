import {
  InfoOutlined,
  ShoppingCartOutlined,
  StarBorder,
  Star,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./Product.scss";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import * as cartActions from '../../actions/cart.actions';

const Product = ({ img, name, price }) => {
	const dispatch = useDispatch();
	const clickedCart = () => {
		dispatch(cartActions.addToCart("616d8cf6bc391b2162102976",1))
	}
  	return (
    <div className="product">
      <div className="productImage">
        <img src={img} alt="" />
        <ul className="actions">
          <li>
            <button onClick={clickedCart}>
              <ShoppingCartOutlined className="icon" />
            </button>
            <span>Add to Cart</span>
          </li>
          <li>
            <InfoOutlined className="icon" />
            <span>View Details</span>
          </li>
        </ul>
      </div>
      <div className="content">
        <h3 className="name">{name}</h3>
        <div className="priceRating">
          <h2>Rs {price}</h2>
          <div className="ratings">
            <Star className="icon" />
            <Star className="icon" />
            <Star className="icon" />
            <Star className="icon gray" />
            <Star className="icon gray" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
