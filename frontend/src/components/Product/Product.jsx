import {
  InfoOutlined,
  ShoppingCartOutlined,
  StarBorder,
  Star,
} from "@material-ui/icons";
import React from "react";
import "./Product.scss";
import { useDispatch } from "react-redux";
import * as cartActions from "../../actions/cart.actions";
import { useHistory } from "react-router";

const Product = ({ id, img, name, price, brand, slug }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const clickedCart = () => {
    dispatch(cartActions.addToCart(id,img,name,price,brand,1));
  };
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
            <InfoOutlined className="icon" onClick={
              (e) => {
                history.push(`/products/${slug}`)
              }
            } />
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
