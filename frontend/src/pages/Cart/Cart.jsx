import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Cart.scss";
import Topbar from "../../components/Topbar/Topbar";
import CartItem from "../../components/cartItem/CartItem";
import axios from "../../helpers/axios";
import { loadStripe } from "@stripe/stripe-js";
import { isAuth } from "../../actions/auth.actions";
import { toast, ToastContainer } from "react-toastify";

const stripePromise = loadStripe(
	"pk_test_51JDrrrSISNBaSVWlLJZpA2SZA1Wp9nv4h0OwwwgHIRp55uNSNMaZifqqX7XxIDJKPGQjZlVqPi4w4HpbYJQnXOf6004vRl90Lj"
);

const Cart = (props) => {
	const cancelled = new URLSearchParams(props.location.search).get("status");
	if(cancelled === "cancelled") {
		toast.error("Payment Unsuccessful! Try again");
	}
	window.onload = () => {
		console.log("Hii")
		axios.get("/cart/").then((res) => {
			localStorage.setItem(
				"cartItems",
				JSON.stringify(res.data.products)
			);
		});
	};

	const cart = useSelector((state) => state.cart.cartItems);
	const amount = cart.reduce(
		(total, item) => total + item.qty * item.price,
		0
	);
	const discountPercent = 0.1;
	const discount = discountPercent * amount;
	const delivery = amount >= 500 ? 50 : 0;
	const totalAmount = amount - discount + delivery;
	const cartLength = cart.length;

	const checkout = async () => {
		const stripe = await stripePromise;

		await axios
			.post("/create-checkout-session", {
				cart,
			})
			.then(async (res) => {
				const { data } = res;
				await stripe
					.redirectToCheckout({
						sessionId: data.id,
					})
					.then((res) => {
						localStorage.removeItem("cartItems");
					})
					.catch((err) => {
						toast.error(err.response.error.message);
					});
			});
	};

	return (
		<>
			{isAuth() === false ? <Redirect to="/login" /> : null}
			<ToastContainer />
			<Topbar {...props} />
			<div id="container">
				<main>
					<h1>MY CART ({cartLength})</h1>
					<hr />
					{cartLength > 0 ? (
						<>
							{cart.map((item) => (
								<CartItem key={item.product} item={item} />
							))}
							<hr />
							<p class="subtotal">
								Subtotal({cartLength}{" "}
								{cartLength === 1 ? "item" : "items"}): &#8377;
								{amount}
							</p>
						</>
					) : (
						<div className="empty">
							<p>YOUR CART IS EMPTY</p>
							<Link to="/">
								<button class="px-6 py-3 border border-transparent rounded-md text-base font-medium text-white">
									Continue Shopping
								</button>
							</Link>
						</div>
					)}
				</main>
				{cartLength > 0 ? (
					<aside>
						<h1>ORDER DETAILS</h1>
						<hr />
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
						<hr />
						<div className="orderTotal">
							<p>TOTAL AMOUNT:</p>
							<p>&#8377;{totalAmount}</p>
						</div>
						<div class="flex justify-center">
							<button
								class="my-3 px-6 py-3 border border-transparent rounded-md text-base font-medium text-white"
								onClick={checkout}
							>
								Checkout
							</button>
						</div>
					</aside>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default Cart;
