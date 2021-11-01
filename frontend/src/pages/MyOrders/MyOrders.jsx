import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import store from "../../store/index";
import { useSelector } from "react-redux";
import { getItems } from "../../actions/products.action";
import { isAuth } from "../../actions/auth.actions";
import Topbar from "../../components/Topbar/Topbar";
import "./MyOrders.scss";
import { WrapText } from "@material-ui/icons";
import axios from "../../helpers/axios";

const MyOrders = (props) => {
	const [orders, setOrders] = useState([]);

	window.onload = async () => {
		await axios.get("order/myorders").then((res) => {
			console.log(res.data);
			setOrders(res.data.orders);
		});
	};

	return (
		<>
			{isAuth() === false ? <Redirect to="/login" /> : null}
			<ToastContainer />
			<Topbar {...props} />
			<div className="myOrders">
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						flexWrap: "wrap",
					}}
				>
					<div class="products-cart">
						<div class="heading">
							<h3>My Orders</h3>
						</div>

						{orders.map((order) => {
							return (
								<div key={order._id} className="products">
									{order.products.map((product, index) => {
										console.log(product);
										return (
											<div
												key={product._id}
												className="orderProduct grid grid-cols-12 "
											>
												<div className="col-span-6">
													<div
														className="img"
														style={{
															width: "150px",
														}}
													>
														<img
															className="product-image"
															width="150px"
															src={product.image}
															alt=""
														/>
													</div>
													<div class="product-data">
														<h3 class="name">
															{
																product.product_name
															}
														</h3>
														<p className="seller">
															Seller:{" "}
															{product.brand}
														</p>
														<p className="price">
															Price:{" "}
															{
																product.retail_price
															}
														</p>
													</div>
												</div>
												{index === 0 ? (
													<>
														<div class="col-span-2">
															<p class="price">
																Rs{" "}
																<span>
																	{order.total +
																		order.shipping}
																</span>
															</p>
														</div>
														<div class="col-span-4">
															Status:{" "}
															<span>
																Delivered
															</span>
														</div>
													</>
												) : null}
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default MyOrders;
