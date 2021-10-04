import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ForgotPassword.module.css";
import store from "../../store";
import { isAuth, forgotPassword } from "../../actions/auth.actions";

const ForgotPassword = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			dispatch(forgotPassword(email));
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<>
			{isAuth() ? <Redirect to="/" /> : null}
			<ToastContainer />
			<div
				className={`w-full h-screen flex justify-center items-center ${styles.wrapper}`}
			>
				<div className={`${styles.mainContainer}`}>
					<div className={`${styles.contentBox}`}></div>
					<div className={`${styles.formBox}`}>
						<form onSubmit={onSubmit}>
							<h2 className={`${styles.heading}`}>
								Forgot Password
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
							<div className="flex flex-col items-center">
								<a
									className={` w-full font-semibold shadow-sm rounded-lg py-3 bg-indigo-400 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-600 focus:shadow-sm focus:shadow-outline mt-5`}
									onClick={onSubmit}
									href="/"
								>
									<span className="ml-4">
										Send reset Mail
									</span>
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
