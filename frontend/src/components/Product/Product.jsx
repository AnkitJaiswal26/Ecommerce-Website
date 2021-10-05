import {
	InfoOutlined,
	ShoppingCartOutlined,
	StarBorder,
	Star,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./Product.scss";

const Product = ({ img, name, price }) => {
	return (
		<div className="product">
			<div className="productImage">
				<img src={img} alt="" />
				<ul className="actions">
					<li><ShoppingCartOutlined className="icon"/>
					<span>Add to Cart</span></li>
					<li>
						<InfoOutlined className="icon"/>
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
