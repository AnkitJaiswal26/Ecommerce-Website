import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import styles from "./Activation.module.css";
import jwt from 'jsonwebtoken';
import store from "../../store";
import { isAuth, activation } from "../../actions/auth.actions";

const Activation = ({match}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const state = store.getState();

    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

    useEffect(() => {
		let token = match.params.token;
		let user = jwt.decode(token);
		if (token) {
            setToken(token);
            setUsername(user.username);
		}
		// eslint-disable-next-line
	}, [match.params]);

    const routeChange = () => {
		let path = `login`;
		history.push(path);
	};

	// TODO: Make this useeffect work. THis is not working properly.
    useEffect(() => {
		setError(store.getState().auth.error);
		setMessage(store.getState().auth.message);

		if (message) toast.success(message);
		if (store.getState().auth.error) toast.error(error);
	}, [store.getState().auth]);

    const onSubmit = (e) => {
		e.preventDefault();
		try {
			setError("");
            dispatch(activation(token));
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
