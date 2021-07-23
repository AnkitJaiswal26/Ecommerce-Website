import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import styles from "./Register.module.css";
import store from "../../store";
import {
	colors,
} from "@material-ui/core/";
import Select from "react-select";
import { isAuth, register } from "../../actions/auth.actions";

const Register = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const routeChange = (path) => {
		let _path = path;
		history.push(_path);
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [role, setRole] = useState("customer");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	
	// TODO: Make this useeffect work. THis is not working properly.
	useEffect(() => {
		setError(store.getState().auth.error);
		setMessage(store.getState().auth.message);

		if (message) toast.success(message);
		if (store.getState().auth.error) toast.error(error);
	}, [store.getState().auth]);

	const signUp = async (username, email, password, role = "customer") => {
		await dispatch(
			register({
				username: username,
				email: email,
				password: password,
				role: role,
			})
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			setError("");
			signUp(username, email, password, role);
      routeChange('productIndex');
		} catch (error) {
			setError(error);
		}
	};

	return (
		<>
			{isAuth() ? <Redirect to="/productIndex" /> : null}
			<ToastContainer />
			<div
				className={`w-full h-screen flex justify-center items-center ${styles.wrapper}`}
			>
				<div className={`${styles.mainContainer}`}>
					<div className={`${styles.contentBox}`}></div>
					<div className={`${styles.formBox}`}>
						<form onSubmit={onSubmit}>
							<h2 className={`${styles.heading}`}>
								Create your Account
							</h2>
							<div className={`${styles.inputContainer}`}>
								<label className={`${styles.inputLabel}`}>
									Username
								</label>
								<input
									className={`${styles.input} w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white`}
									type="text"
									placeholder="Enter your username"
									onChange={(e) =>
										setUsername(e.target.value)
									}
									value={username}
								/>
							</div>
							<div className={`${styles.inputContainer}`}>
								<label className={`${styles.inputLabel}`}>
									Email
								</label>
								<input
									className={`w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white`}
									type="email"
									placeholder="Enter your email"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</div>
							<div className={`${styles.inputContainer}`}>
								<label className={`${styles.inputLabel}`}>
									Password
								</label>
								<input
									className={`w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white`}
									type="password"
									placeholder="Enter your password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									value={password}
								/>
							</div>
							<div className={`${styles.inputContainer}`}>
								<label className={`${styles.inputLabel}`}>
									Role
								</label>
								<Select
									styles={{
										option: (base, state) => ({
											...base,
											fontSize: "0.875rem",
											color: state.isSelected
												? "#fff"
												: "#555",
										}),
										control: (css) => ({
											...css,
											paddingLeft: "0.8rem",
											fontSize: "0.875rem",
										}),
									}}
									theme={(theme) => ({
										...theme,
										colors: {
											...colors,
											primary: "rgb(140, 140, 250)",
											neutral0: "#F7FAFC",
											neutral20: "#e2e8f0",
											neutral50: "rgba(156, 163, 175, 1)",
											neutral80: "#000",
										},
									})}
									className={`w-full`}
									defaultValue="customer"
									placeholder="Customer"
									options={[
										{
											label: "Customer",
											value: "customer",
										},
										{ label: "Seller", value: "seller" },
									]}
									onChange={(e) => setRole(e.value)}
								/>
							</div>
							<div className="flex flex-col items-center">
								<a
									className={` w-full font-semibold shadow-sm rounded-lg py-3 bg-indigo-400 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-600 focus:shadow-sm focus:shadow-outline mt-5`}
									onClick={onSubmit}
									href="/"
								>
									<span className="ml-4">Register</span>
								</a>
							</div>
						</form>
						<div>
							<h6 className={`${styles.already}`}>
								Alredy have an Account?
								<Link
									className={`${styles.alreadyLink}`}
									to={`/login`}
								>
									{" "}
									Log In
								</Link>
							</h6>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
