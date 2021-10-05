import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import store from "../../store/index";
import { useSelector } from "react-redux";
import { getItems } from "../../actions/products.action";
import { isAuth } from "../../actions/auth.actions";
import Topbar from "../../components/Topbar/Topbar";
import Product from "../../components/Product/Product";
import "./Menu.scss";
import Filters from "../../components/Filters/Filters";

const Menu = () => {
	// const data = useSelector((state) => state);
	// // const products = useSelector((state) => state.products);
	// const history = useHistory();
	// const dispatch = useDispatch();
	// // const state = store.getState();
	// const routeChange = (path) => {
	// 	history.push(path);
	// };

	// useEffect(() => {
	// 	dispatch(getItems());
	// 	// setProductList(data.products.productList);
	// 	// console.log(data);
	// 	// console.log(productList);
	// }, [data]);
	// const [productList, setProductList] = useState([
	// 	...data.products.productList,
	// ]);
	// console.log(productList);
	// // console.log(productList)
	// useEffect(() => {
	// 	// setProductList(data.products.productList);
	// });

	return (
		<>
			{isAuth() === false ? <Redirect to="/login" /> : null}
			<ToastContainer />
			<Topbar />
			<Filters />
			<div className="productsContainer">
				<Product
					key="1"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
					name="Blue Shirt"
					price="100.00"
				/>
				<Product
					key="2"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/29.jpg"
					name="Kids Shirt"
					price="900.00"
				/>
				<Product
					key="3"
					name="Blue Jeans"
					price="560.00"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
				/>
				<Product
					key="4"
					name="Lorem Ipsum Kids Six"
					price="98.90"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/29.jpg"
				/>
				<Product
					key="5"
					name="Lorem Ipsum Kids Seven"
					price="100.15"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
				/>
				<Product
					key="6"
					name="Lorem Ipsum Kids Ten"
					price="200.00"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/29.jpg"
				/>
				<Product
					name="White Nice Blue Jacket"
					price="100"
					key="7"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/30.jpg"
				/>
				<Product
					key="8"
					name="Blue Shirt"
					price="150.00"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
				/>
				<Product
					key="9"
					name="White Nice Blue Jacket"
					price="120.00"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
				/>
				<Product
					name="Blue Shirt"
					price="340.00"
					key="10"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
				/>
				<Product
					name="Yellow Shoes"
					price="690.00"
					key="11"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
				/>
				<Product
					name="Blue Shirt"
					price="1050.00"
					key="12"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
				/>
				<Product
					key="13"
					name="Blue Jeans"
					price="230.00"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
				/>
				<Product
					key="14"
					name="Blue Shirt"
					price="100.00"
					img="https://flone.reactdemo.hasthemes.com/assets/img/product/fashion/28.jpg"
				/>
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
