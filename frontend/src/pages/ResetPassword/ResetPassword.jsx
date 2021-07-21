import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { jwt } from "jsonwebtoken";
import styles from "./ResetPassword.module.css";
import store from "../../store";
import { isAuth, resetPassword } from "../../actions/auth.actions";

const ResetPassword = ({ match }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const routeChange = () => {
		let path = `login`;
		history.push(path);
	};
	const [token, setToken] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		let token = match.params.token;
		if (token) {
			setToken(token);
		}
		// eslint-disable-next-line
	}, [match.params]);

	// TODO: Make this useeffect work. THis is not working properly.
	useEffect(() => {
		setError(store.getState().auth.error);
		setMessage(store.getState().auth.message);

		if (message) toast.success(message);
		if (store.getState().auth.error) toast.error(error);
	}, [store.getState().auth]);

	const reset = async (token, password) => {
		await dispatch(
			resetPassword(
				token,
				password
			)
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			setError("");
			reset(token, password);
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
								Reset Password
							</h2>
							<div className={`${styles.inputContainer}`}>
								<label className={`${styles.inputLabel}`}>
									New Password
								</label>
								<input
									className={`w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white`}
									type="password"
									placeholder="Enter your new password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									value={password}
								/>
							</div>
							<div className="flex flex-col items-center">
								<a
									className={` w-full font-semibold shadow-sm rounded-lg py-3 bg-indigo-400 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-600 focus:shadow-sm focus:shadow-outline mt-5`}
									onClick={onSubmit}
									href="/"
								>
									<span className="ml-4">Reset Password</span>
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
