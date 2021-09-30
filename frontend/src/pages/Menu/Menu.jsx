import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import store from "../../store/index";
import { useSelector } from "react-redux";
import { getItems } from "../../actions/products.action";
import { isAuth } from "../../actions/auth.actions";

const Menu = () => {
	const data = useSelector((state) => state);
	// const products = useSelector((state) => state.products);
	const history = useHistory();
	const dispatch = useDispatch();
	// const state = store.getState();
	const routeChange = (path) => {
		history.push(path);
	};

	useEffect(() => {
		dispatch(getItems());
		// setProductList(data.products.productList);
		// console.log(data);
		// console.log(productList);
	}, [data]);
	const [productList, setProductList] = useState([
		...data.products.productList,
	]);
	console.log(productList);
	// console.log(productList)
	useEffect(() => {
		// setProductList(data.products.productList);
	});

	return (
		<>
			{isAuth() === false ? <Redirect to="/login" /> : null}
			<ToastContainer />
			<div>
				<h1>Hello</h1>
				{/* <h2>{productList[0].name}</h2> */}
				<ul>
					{productList.map((prod) => {
						return <li>{prod.name}</li>;
					})}
				</ul>
			</div>
		</>
	);
};

export default Menu;
