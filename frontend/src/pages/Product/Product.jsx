import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Product.scss";
import Topbar from "../../components/Topbar/Topbar";

const Product = ({ match }) => {
	const product = useSelector((state) =>
		state.products.productList.filter((x) => x.slug === match.params.slug)
	)[0];
	
    console.log(product);

	return (
		<div className="mainIndividualProductContainer">
			<Topbar />
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
							// onClick={onSubmit}
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
