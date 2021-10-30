import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { isAuth } from "../../actions/auth.actions";
import Topbar from "../../components/Topbar/Topbar";
import Product from "../../components/Product/Product";
import "./Menu.scss";
import Filters from "../../components/Filters/Filters";
import { ArrowRightAlt } from "@material-ui/icons";

const Menu = () => {
	const productList = useSelector((state) => state.products.productList);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 30;

	const [pageNumberLimit, setpageNumberLimit] = useState(5);
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const products = productList.slice(indexOfFirstItem, indexOfLastItem);

	const pages = [];
	for (let i = 1; i <= Math.ceil(productList.length / 30); i++) {
		pages.push(i);
	}

	const handleClick = (event) => {
		setCurrentPage(Number(event.target.id));

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
	};

	const renderPageNumbers = pages.map((number) => {
		if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
			return (
				<li
					key={number}
					id={number}
					onClick={handleClick}
					className={currentPage === number ? "active" : null}
				>
					{number}
				</li>
			);
		} else {
			return null;
		}
	});

	const handleNextbtn = () => {
		setCurrentPage(currentPage + 1);

		if (currentPage + 1 > maxPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
	};

	const handlePrevbtn = () => {
		setCurrentPage(currentPage - 1);

		if ((currentPage - 1) % pageNumberLimit === 0) {
			setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
	};

	let pageIncrementBtn = null;
	if (pages.length > maxPageNumberLimit) {
		pageIncrementBtn = <li style={{
      border: "none"
    }} onClick={handleNextbtn}> &hellip; </li>;
	}

	let pageDecrementBtn = null;
	if (minPageNumberLimit >= 1) {
		pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
	}

	return (
		<>
			{isAuth() === false ? <Redirect to="/login" /> : null}
			<ToastContainer />
			<Topbar />
			<Filters />
			<div className="productsContainer">
				{products.map((product) => (
					<Product
						key={product._id}
						id={product._id}
						img={product.image}
						name={product.product_name}
						price={product.retail_price}
						brand={product.brand}
						slug={product.slug}
					/>
				))}
			</div>
      <ul className="pageNumbers">
					<li className="buttons">
						<button
							onClick={handlePrevbtn}
							disabled={currentPage === pages[0] ? true : false}
						>
              Previous
						</button>
					</li>
					{pageDecrementBtn}
					{renderPageNumbers}
					{pageIncrementBtn}

					<li className="buttons">
						<button
							onClick={handleNextbtn}
							disabled={
								currentPage === pages[pages.length - 1]
									? true
									: false
							}
						>
							Next
							<ArrowRightAlt className="icon"/>
						</button>
					</li>
				</ul>
		</>
	);
};

export default Menu;
