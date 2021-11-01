import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Topbar.scss";
import logo from "../../images/hlogo.jpeg";
import { useHistory } from "react-router";

import {
	AccountCircleOutlined,
	SearchOutlined,
	SettingsOutlined,
	ShoppingCartOutlined,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth.actions";

const Topbar = (props) => {
	const dispatch = useDispatch();

	const [data, setData] = useState(
		new URLSearchParams(props.location.search).get("search")
			? new URLSearchParams(props.location.search).get("search")
			: ""
	);
	const [dropdown, setDropdown] = useState(false);

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
	const history = useHistory();

	return (
		<div className="topbar">
			<div className="mainContainer">
				<div className="container">
					<div className="logo">
						<Link to="/">
							<img src={logo} alt="" />
						</Link>
					</div>
					<div className="smallContainer">
						<ul className="links">
							{/* <li className="listItem">
								<Link to="/">
									<div className="navLink">Crafts</div>
								</Link>
							</li>
							<li className="listItem">
								<Link to="/">
									<div className="navLink">Jewellery</div>
								</Link>
							</li>
							<li className="listItem">
								<Link to="/">
									<div className="navLink">Artistic</div>
								</Link>
							</li>
							<li className="listItem">
								<Link to="/">
									<div className="navLink">Apparel</div>
								</Link>
							</li>
							<li className="listItem">
								<Link to="/">
									<div className="navLink">Wall Decor</div>
								</Link>
							</li> */}
						</ul>
						<div className="profile">
							<div className="search">
								<div className="searchInput">
									<input
										className=" px-5 py-2 sm:rounded-md font-medium placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
										type="text"
										placeholder="Search..."
										value={data}
										onChange={(e) =>
											setData(e.target.value)
										}
									/>
									<div
										className="searchIcon border"
										onClick={(e) => {
											if (data !== "")
												queries.search = data;
											else delete queries["search"];

											history.push({
												pathname: "/",
												search: `?${objectToQueryString(
													queries
												)}`,
											});
											window.location.reload(true);
										}}
									>
										<SearchOutlined className="searchicon" />
									</div>
								</div>
							</div>
							<AccountCircleOutlined
								className="icon"
								onClick={() => setDropdown((prev) => !prev)}
							/>
							{dropdown && (
								<ul
									className={
										!dropdown
											? "dropdown clicked"
											: "dropdown"
									}
								>
									<li onClick={() => setDropdown(false)}>
										<div className="dropdownLink">
											<Link to="/account">
												<SettingsOutlined className="icon" />{" "}
												Settings
											</Link>
										</div>
									</li>
									<li onClick={() => setDropdown(false)}>
										<div className="dropdownLink">
											<Link to="/myorders">
												<SettingsOutlined className="icon" />{" "}
												My Orders
											</Link>
										</div>
									</li>
									<li onClick={() => setDropdown(false)}>
										<div className="dropdownLink">
											<Link
												to="/"
												onClick={async (e) =>
													await dispatch(logout())
												}
											>
												<SettingsOutlined className="icon" />{" "}
												Logout
											</Link>
										</div>
									</li>
								</ul>
							)}
							<Link to="/cart">
								<ShoppingCartOutlined className="icon" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
