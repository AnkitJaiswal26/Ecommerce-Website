import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";
import store from "../../store";
import { isAuth, login } from "../../actions/auth.actions";
import {useSelector} from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
	const history = useHistory();

	const routeChange = () => {
		let path = `productIndex`;
		history.push(path);
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const data = useSelector((state) => state.auth);

	useEffect(() => {
		if (data.message) toast.success(data.message);
		if (data.error) toast.error(data.error);
	}, [data]);

	const logIn = async (email, password) => {
		await dispatch(
			login({
				email: email,
				password: password,
			})
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			setError("");
			logIn(email, password);
			if(isAuth()) console.log("Logged In");
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
								Login
							</h2>
							
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
							<div className={`flex flex-row-reverse`}>
								<Link
									to={"/forgotPassword"}
									className={`${styles.forgot}`}
								>
									Forgot Password?
								</Link>
							</div>
							<div className="flex flex-col items-center">
								<a
									className={` w-full font-semibold shadow-sm rounded-lg py-3 bg-indigo-400 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-600 focus:shadow-sm focus:shadow-outline mt-5`}
									onClick={onSubmit}
									href="/"
								>
									<span className="ml-4">Log In</span>
								</a>
							</div>
						</form>
						<div>
							<h6 className={`${styles.already}`}>
								Don't have an Account?
								<Link
									className={`${styles.alreadyLink}`}
									to={`/login`}
								>
									{" "}
									Register
								</Link>
							</h6>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login
