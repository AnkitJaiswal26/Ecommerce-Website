import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Filters.scss";

const Filters = () => {
	const [dropdown, setDropdown] = useState(false);
	return (
		<div className="filtersSection">
			<h3 className="number">
				1-24 of over 3,000 results for <span>"mobile"</span>
			</h3>

			<div className="minMax">
				<div className="min">
					<input
						className=" px-5 py-2 sm:rounded-md font-medium placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
						type="text"
						placeholder="Min"
					/>
				</div>
				<div className="max">
					<input
						className=" px-5 py-2 sm:rounded-md font-medium placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
						type="text"
						placeholder="Max"
					/>
				</div>
			</div>

			<div
				className="sortBy"
				onClick={() => setDropdown((prev) => !prev)}
			>
				<div className="sort">Sort By: Price Low to High</div>
				{dropdown && (
					<ul className={!dropdown ? "dropdown clicked" : "dropdown"}>
						<li onClick={() => setDropdown(false)}>
							<div className="dropdownLink active">
								<Link to="/">Price High to Low</Link>
							</div>
						</li>
						<li onClick={() => setDropdown(false)}>
							<div className="dropdownLink">
								<Link to="/">Name: Ascending</Link>
							</div>
						</li>
						<li
							onClick={() => {
								setDropdown(false);
							}}
						>
							<div className="dropdownLink">
								<Link to="/">Name: Descending</Link>
							</div>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default Filters;
