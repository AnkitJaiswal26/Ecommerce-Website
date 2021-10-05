import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Topbar.scss";
import logo from "../../images/hlogo.jpeg";

import {
	AccountCircleOutlined,
	SearchOutlined,
	SettingsOutlined,
	ShoppingCartOutlined,
} from "@material-ui/icons";

const Topbar = () => {
    const [data, setData] = useState("");
	const [dropdown, setDropdown] = useState(false);

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
							<li className="listItem">
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
							</li>
						</ul>
						<div className="profile">
							<div className="search">
								<div className="searchInput">
									<input
										className=" px-5 py-2 sm:rounded-md font-medium placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
										type="text"
										placeholder="Search..."
										value={data}
										onChange={(e) => setData(e.target.value)}
									/>
									<div
										className="searchIcon border"
                                        // TODO: Add search feature using redux
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
											<Link to="/">
												<SettingsOutlined className="icon" />{" "}
												Settings
											</Link>
										</div>
									</li>
									<li onClick={() => setDropdown(false)}>
										<div className="dropdownLink">
											<Link to="/">
												<SettingsOutlined className="icon" />{" "}
												My Orders
											</Link>
										</div>
									</li>
									<li onClick={() => setDropdown(false)}>
										<div className="dropdownLink">
											<Link to="/">
												<SettingsOutlined className="icon" />{" "}
												Logout
											</Link>
										</div>
									</li>
								</ul>
							)}
							<Link to="/">
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
