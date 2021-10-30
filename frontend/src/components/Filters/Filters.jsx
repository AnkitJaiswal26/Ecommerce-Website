import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Filters.scss";

const Filters = (props) => {
	const sort = new URLSearchParams(props.location.search).get("sort");
	const min = new URLSearchParams(props.location.search).get("min");
	const max = new URLSearchParams(props.location.search).get("max");

	const [dropdown, setDropdown] = useState(false);
	const [query, setQuery] = useState({});

	const history = useHistory();

	const sortDict = {
		1: "Price Low to High",
		0: "Price High to Low",
		a: "Name: Ascending",
		z: "Name: Descending",
	};

	const queryStringToJSON = (qs) => {
		qs = qs.slice(1, qs.length);
		var pairs = qs.split("&");
		var result = {};
		pairs.forEach(function (p) {
			var pair = p.split("=");
			var key = pair[0];
			var value = decodeURIComponent(pair[1] || "");

			if (result[key]) {
				if (
					Object.prototype.toString.call(result[key]) ===
					"[object Array]"
				) {
					result[key].push(value);
				} else {
					result[key] = [result[key], value];
				}
			} else {
				result[key] = value;
			}
		});

		return JSON.parse(JSON.stringify(result));
	};

	function objectToQueryString(obj) {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(
					encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
				);
			}
		return str.join("&");
	}

	const queries = queryStringToJSON(props.location.search);

	return (
		<div className="filtersSection">
			{/* <h3 className="number">
				1-24 of over 3,000 results for <span>"mobile"</span>
			</h3> */}

			<div className="minMax">
				<div className="min">
					<input
						className=" px-5 py-2 sm:rounded-md font-medium placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
						type="text"
						placeholder="Min"
						value={min ? min : null}
						onChange={(e) => {
							if (e.target.value !== "")
								queries.min = e.target.value;
							else delete queries["min"];

							history.push({
								pathname: "/",
								search: `?${objectToQueryString(queries)}`,
							});
						}}
					/>
				</div>
				<div className="max">
					<input
						className=" px-5 py-2 sm:rounded-md font-medium placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
						type="text"
						value={max ? max : null}
						onChange={(e) => {
							if (e.target.value !== "")
								queries.max = e.target.value;
							else delete queries["max"];
							history.push({
								pathname: "/",
								search: `?${objectToQueryString(queries)}`,
							});
						}}
						placeholder="Max"
					/>
				</div>
			</div>

			<div
				className="sortBy"
				onClick={() => setDropdown((prev) => !prev)}
			>
				<div className="sort">Sort By: {sortDict[sort]}</div>
				{dropdown && (
					<ul className={!dropdown ? "dropdown clicked" : "dropdown"}>
						{Object.entries(sortDict).map(([key, value]) => {
							if (key !== sort) {
								return (
									<li
										key={key}
										onClick={() => {
											queries.sort = key;
											history.push({
												pathname: "/",
												search: `?${objectToQueryString(
													queries
												)}`,
											});
										}}
									>
										<div className="dropdownLink">
											<p>{value}</p>
										</div>
									</li>
								);
							}
							return null;
						})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Filters;
