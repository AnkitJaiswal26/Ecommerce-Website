import { authConstants } from "./constants";
import axios from "../helpers/axios";

export const register = (user) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.REGISTER_REQUEST,
		});

		const res = await axios.post("api/auth/register", {
			...user,
		});
		if (res.status === 200) {
			dispatch({
				type: authConstants.REGISTER_SUCCESS,
				payload: {
					message: res.data.message,
				},
			});
		} else {
			if (res.status === 400) {
				const error = res.data.error;
				dispatch({
					type: authConstants.REGISTER_FAILURE,
					payload: {
						error,
					},
				});
			}
		}
	};
};

export const activation = (token) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.ACTIVATION_REQUEST,
		});

		const res = await axios.post("/activation", token);

		if (res.status === 200) {
			dispatch({
				type: authConstants.ACTIVATION_SUCCESS,
				payload: {
					message: res.data.message,
				},
			});
		} else {
			if (res.status === 400) {
				const error = res.data.error;
				dispatch({
					type: authConstants.ACTIVATION_FAILURE,
					payload: {
						error,
					},
				});
			}
		}
	};
};

export const login = (user) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.LOGIN_REQUEST,
		});
		const res = await axios.post(`/login`, {
			...user,
		});

		if (res.status === 200) {
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
		} else if (res.status === 400) {
			dispatch({
				type: authConstants.LOGIN_FAILURE,
				payload: {
					error: res.data.error,
				},
			});
		}
	};
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
		if (isUserLogggedIn()) {
			dispatch({
				type: authConstants.FORGOT_PASSWORD_FAILURE,
				payload: {
					error: "User Already Logged In",
				},
			});
		}
		const res = await axios.put("/forgotPassword", email);
		if (res.status === 200) {
			dispatch({
				type: authConstants.FORGOT_PASSWORD_SUCCESS,
				message: res.data.message,
			});
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.FORGOT_PASSWORD_FAILURE,
					error: res.data.error,
				});
			}
		}
	};
};

export const resetPassword = (resetPasswordLink, password) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.RESET_PASSWORD_REQUEST,
		});
		
		const res = await axios.post("/resetPassword", {
			resetPasswordLink,
			newPassword: password,
		});

		if (isUserLogggedIn()) {
			dispatch({
				type: authConstants.FORGOT_PASSWORD_FAILURE,
				payload: {
					error: "User Already Logged In",
				},
			});
		}

		if (res.status === 200) {
			dispatch({
				type: authConstants.RESET_PASSWORD_SUCCESS,
				payload: {
					message: res.data.message,
				},
			});
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.RESET_PASSWORD_FAILURE,
					payload: {
						error: res.data.error,
					},
				});
			}
		}
	};
};
