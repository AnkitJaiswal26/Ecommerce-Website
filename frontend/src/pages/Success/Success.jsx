import React from "react";
import axios from "../../helpers/axios";
import { Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Success = (props) => {
	const products = JSON.parse(
		new URLSearchParams(props.location.search).get("products")
	);
	console.log(products);
	toast.success("Transaction Successfull");

	window.onload = async () => {
        console.log("Hii")
		axios
			.post("/order", {
				products: products,
			})
			.catch((err) => {
				toast.error(err.response.data.error);
			});
	};

	window.localStorage.removeItem("cartItems");
	return (
		<>
			<ToastContainer />
			<Redirect to="/" />
		</>
	);
};

export default Success;
