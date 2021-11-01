import { authConstants } from "./constants";
import axios from "../helpers/axios";
import { toast } from "react-toastify";
import { createBrowserHistory } from "history";

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
				toast.error(data.error);
				dispatch({
					type: authConstants.REGISTER_FAILURE,
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
				const history = createBrowserHistory();
				toast.success(res.data.message);
				history.push("login");
				dispatch({
					type: authConstants.ACTIVATION_SUCCESS,
				});
			})
			.catch((err) => {
				const { data } = err.response;
				toast.error(data.error);
				dispatch({
					type: authConstants.ACTIVATION_FAILURE,
				});
			});
	};
};

export const login = (user, history) => {
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
				toast.success("Login Successfully!");

				dispatch({
					type: authConstants.LOGIN_SUCCESS,
					payload: {
						token,
						user,
					},
				});

				history.push("/");
			})
			.catch((err) => {
				console.log(err);
				const { data } = err.response;
				toast.error(data.error);
				dispatch({
					type: authConstants.LOGIN_FAILURE,
				});
			});
	};
};

//TODO: USER CAN BE NOT NULL EVEN IF EMAIL IS "".
export const isAuth = () => {
	const token = localStorage.getItem("token");
	if (token) {
		const user = JSON.parse(localStorage.getItem("user"));
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
			toast.error("Failed to login!");
			dispatch({
				type: authConstants.LOGIN_FAILURE,
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
		toast.success("Logout Successfully!");
		dispatch({
			type: authConstants.LOGOUT_SUCCESS,
		});
	};
};

export const forgotPassword = (email) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.FORGOT_PASSWORD_REQUEST,
		});

		if (isAuth()) {
			toast.error("User Already Logged In");
			dispatch({
				type: authConstants.FORGOT_PASSWORD_FAILURE,
			});
			const history = createBrowserHistory();
			history.push("/");
			window.location.reload();
		}

		axios
			.put("/auth/forgotPassword", {
				email,
			})
			.then((res) => {
				const { message } = res.data;
				toast.success(message);
				dispatch({
					type: authConstants.FORGOT_PASSWORD_SUCCESS,
				});
			})
			.catch((error) => {
				toast.error(error.response.data.error);
				dispatch({
					type: authConstants.FORGOT_PASSWORD_FAILURE,
				});
			});
	};
};

export const resetPassword = (resetPasswordLink, password) => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.RESET_PASSWORD_REQUEST,
		});

		if (isAuth()) {
			toast.error("User Already Logged In");
			dispatch({
				type: authConstants.RESET_PASSWORD_FAILURE,
			});
		}

		axios
			.put("/auth/resetPassword", {
				resetPasswordLink,
				newPassword: password,
			})
			.then((res) => {
				toast.success(res.data.message);
				dispatch({
					type: authConstants.RESET_PASSWORD_SUCCESS,
				});
				const history = createBrowserHistory();
				history.push("/login");
			})
			.catch((err) => {
				const { data } = err.response;
				toast.error(data.error);
				dispatch({
					type: authConstants.RESET_PASSWORD_FAILURE,
				});
			});
	};
};

export const updateEmail = (email) => {
	return async (dispatch) => {
		axios
			.put("/users/updateEmail", {
				email: email,
			})
			.then((res) => {
				const { message } = res.data;
				toast.success(message);

				dispatch({
					type: authConstants.UPDATE_EMAIL,
					payload: {
						email: email,
					},
				});
			})
			.catch((err) => {
				toast.error(err.response.data.error);
			});
	};
};
