import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import store from "../../store/index";
import { useSelector } from "react-redux";
import { isAuth } from "../../actions/auth.actions";
import Topbar from "../../components/Topbar/Topbar";
import Product from "../../components/Product/Product";
import "./Menu.scss";
import Filters from "../../components/Filters/Filters";
import axios from "../../helpers/axios";

const Menu = () => {
  const productList = useSelector((state) => state.products.productList);
  // console.log(productList);
  // const products = useSelector((state) => state.products);
  // const history = useHistory();
  // const dispatch = useDispatch();
  // // const state = store.getState();
  // const routeChange = (path) => {
  // 	history.push(path);
  // };

  // useEffect(() => {
  // 	dispatch(getItems());
  // 	setProductList(data.products.productList);
  // 	console.log(data);
  // 	console.log(productList);
  // }, [data]);
  // const [productList, setProductList] = useState([
  // 	...data.products.productList,
  // ]);
  // console.log(productList);
  // console.log(productList)
  // useEffect(() => {
  // 	setProductList(data.products.productList);
  // });

  return (
    <>
      {isAuth() === false ? <Redirect to="/login" /> : null}
      <ToastContainer />
      <Topbar />
      <Filters />
      <div className="productsContainer">
        {productList.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            img={product.image}
            name={product.product_name}
            price={product.retail_price}
            brand={product.brand}
          />
        ))}
      </div>
      {/* <div>
				<h1>Hello</h1>
				{/* <h2>{productList[0].name}</h2> */}
      {/* <ul>
					{productList.map((prod) => {
						return <li>{prod.name}</li>;
					})}
				</ul>
			</div> */}
    </>
  );
};

export default Menu;
