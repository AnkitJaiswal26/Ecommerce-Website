import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Product.scss";
import Topbar from "../../components/Topbar/Topbar";
import { addToCart } from "../../actions/cart.actions";

const Product = (props) => {
	const match = props.match;
	const product = useSelector((state) =>
		state.products.productList.filter((x) => x.slug === match.params.slug)
	)[0];

	const dispatch = useDispatch();

	const clickedCart = () => {
		dispatch(
			addToCart(
				product._id,
				product.image,
				product.product_name,
				product.retail_price,
				product.brand,
				1
			)
		);
	};

	console.log(product);

	return (
		<div className="mainIndividualProductContainer">
			<Topbar {...props }/>
			<div className="productContainer">
				<div className="imageContainer">
					<img src={product ? product.image : ""} alt="" />
				</div>
				<div className="productDetails">
					<h3 className="productTitle">
						{product ? product.product_name : ""}
					</h3>
					<p className="seller">
						Seller : {product ? product.brand : ""}
					</p>
					<hr className="divider" />
					<div className="price">
						<p>Rs. {product ? product.retail_price : ""}</p>
					</div>
					<div className="addToCart">
						<a
							className="w-full shadow-sm py-2 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
							onClick={clickedCart}
							href="/"
						>
							<span>Add to Cart</span>
						</a>
					</div>
					<div className="description">
						<h5>Description:</h5>
						<p>{product ? product.description : ""}</p>
					</div>

					{/* <div className="specifications">
                        <h5>Specifications: </h5>
                    </div> */}
				</div>
			</div>
		</div>
	);
};

export default Product;
