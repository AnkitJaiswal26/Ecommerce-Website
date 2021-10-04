import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Activation.module.css";
import jwt from "jsonwebtoken";
import store from "../../store";
import { isAuth, activation } from "../../actions/auth.actions";

const Activation = ({ match }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [username, setUsername] = useState("");
	const [token, setToken] = useState("");
	const data = useSelector((state) => state.auth);

	const [error, setError] = useState("");

	useEffect(() => {
		let token = match.params.token;
		let user = jwt.decode(token);
		if (token) {
			console.log(token);
			setToken(token);
		}
		if (user) {
			setUsername(user.username);
		} else{
      toast.error("Invalid token")
    }
		// eslint-disable-next-line
	}, [match.params]);

	const routeChange = (_path) => {
		let path = _path;
		history.push(path);
	};

	useEffect(() => {
		if(data.error) toast.error(data.error)
    if(data.message) toast.message(data.message)
	}, [data]);

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			setError("");
			dispatch(activation(token));
			routeChange("productIndex");
		} catch (error) {
			setError(error);
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
								Welcome {username}! <br />
								<span>
									Please click the below button to activate
									your account
								</span>
							</h2>

							<div className="flex flex-col items-center">
								<a
									className={` w-full font-semibold shadow-sm rounded-lg py-3 bg-indigo-400 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-600 focus:shadow-sm focus:shadow-outline mt-5`}
									onClick={onSubmit}
									href="/"
								>
									<span className="ml-4">
										Activate your Account
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

export default Activation;
