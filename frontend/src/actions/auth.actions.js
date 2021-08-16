import { authConstants } from "./constants";
import axios from "../helpers/axios";

export const register = (user) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.REGISTER_REQUEST,
		});

		axios
			.post("/auth/register", {
				...user,
			})
			.then((res) => {
				dispatch({
					type: authConstants.REGISTER_SUCCESS,
					payload: {
						message: res.data.message,
					},
				});
			})
			.catch((err) => {
				const { data } = err.response;
				dispatch({
					type: authConstants.REGISTER_FAILURE,
					payload: {
						error: data.error,
					},
				});
			});
	};
};

export const activation = (token) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.ACTIVATION_REQUEST,
		});

		axios
			.post("/auth/activation", {
				token: token,
			})
			.then((res) => {
				dispatch({
					type: authConstants.ACTIVATION_SUCCESS,
					payload: {
						message: res.data.message,
					},
				});
			})
			.catch((err) => {
				const { data } = err.response;
				dispatch({
					type: authConstants.ACTIVATION_FAILURE,
					payload: {
						error: data.error,
					},
				});
			});
	};
};

export const login = (user) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.LOGIN_REQUEST,
		});
		axios
			.post(`/auth/login`, {
				...user,
			})
			.then((res) => {
				const { token, user } = res.data;
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(user));
				dispatch({
					type: authConstants.LOGIN_SUCCESS,
					payload: {
						token,
						user,
						message: "Login Successful",
					},
				});
			})
			.catch((err) => {
				const { data } = err.response;
				dispatch({
					type: authConstants.LOGIN_FAILURE,
					payload: {
						error: data.error,
					},
				});
			});
	};
};

//TODO: USER CAN BE NOT NULL EVEN IF EMAIL IS "".
export const isAuth = (_auth) => {
	// const token = localStorage.getItem("token");
	const {token, user} = _auth;
	if (token) {
		// const user = JSON.parse(localStorage.getItem("user"));
		if (user) return true;
	}
	return false;
};

export const isUserLogggedIn = () => {
	return async (dispatch) => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = JSON.parse(localStorage.getItem("user"));
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: {
					token,
					user,
				},
			});
		} else {
			dispatch({
				type: authConstants.LOGIN_FAILURE,
				payload: {
					error: "Failed to Login!",
				},
			});
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.LOGOUT_REQUEST,
		});
		localStorage.clear();
		dispatch({
			type: authConstants.LOGOUT_SUCCESS,
			payload: {
				message: "Logout Successful",
			},
		});
	};
};

export const forgotPassword = (email) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.FORGOT_PASSWORD_REQUEST,
		});

		// TODO: First implement logout page and then uncomment this
		// if (isUserLogggedIn()) {
		// 	dispatch({
		// 		type: authConstants.FORGOT_PASSWORD_FAILURE,
		// 		payload: {
		// 			error: "User Already Logged In",
		// 		},
		// 	});
		// }

		axios
			.put("/auth/forgotPassword", {
				email,
			})
			.then((res) => {
				const { message } = res.data;
				console.log(message);
				dispatch({
					type: authConstants.FORGOT_PASSWORD_SUCCESS,
					payload: {
						message: message,
					},
				});
			})
			.catch((error) => {
				console.log("Hiii");
				dispatch({
					type: authConstants.FORGOT_PASSWORD_FAILURE,
					payload: {
						error: error.response.data.error,
					},
				});
			});
	};
};

export const resetPassword = (resetPasswordLink, password) => {

	console.log(resetPasswordLink)
	console.log("----------------------------")
	console.log(password)
	return async (dispatch) => {
		dispatch({
			type: authConstants.RESET_PASSWORD_REQUEST,
		});

		// TODO: First implement logout page and then uncomment this
		// if (isUserLogggedIn()) {
		// 	dispatch({
		// 		type: authConstants.FORGOT_PASSWORD_FAILURE,
		// 		payload: {
		// 			error: "User Already Logged In",
		// 		},
		// 	});
		// }

		axios
			.put("/auth/resetPassword", {
				resetPasswordLink,
				newPassword: password,
			})
			.then((res) => {
				dispatch({
					type: authConstants.RESET_PASSWORD_SUCCESS,
					payload: {
						message: res.data.message,
					},
				});
			})
			.catch((err) => {
				const { data } = err.response;
				dispatch({
					type: authConstants.RESET_PASSWORD_FAILURE,
					payload: {
						error: data.error,
					},
				});
			});
	};
};
