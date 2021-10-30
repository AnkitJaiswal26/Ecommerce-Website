import { authConstants } from "../actions/constants";

const initState = {
	token: null,
	user: {
		userName: "",
		email: "",
		profilePicture: "",
		role: "",
	},
	authenticate: false,
	authenticating: false,
	loading: false,
};

export const authReducer = (state = initState, action) => {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			state = {
				...state,
				authenticating: true,
			};
			break;
		case authConstants.LOGIN_SUCCESS:
			state = {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false,
			};
			break;
		case authConstants.LOGOUT_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;
		case authConstants.LOGOUT_SUCCESS:
			state = {
				...initState,
			};
			break;
		case authConstants.LOGOUT_FAILURE:
			state = {
				...state,
				loading: false,
			};
			break;
		case authConstants.LOGIN_FAILURE:
			state = {
				...state,
				authenticating: false,
			};
			break;
		case authConstants.REGISTER_REQUEST:
			state = {
				...state,
			};
			break;
		case authConstants.REGISTER_SUCCESS:
			state = {
				...state,
			};
			break;
		case authConstants.REGISTER_FAILURE:
			state = {
				...state,
			};
			break;
		case authConstants.ACTIVATION_REQUEST:
			state = {
				...state,
			};
			break;
		case authConstants.ACTIVATION_SUCCESS:
			state = {
				...state,
			};
			break;
		case authConstants.ACTIVATION_FAILURE:
			state = {
				...state,
			};
			break;
		case authConstants.FORGOT_PASSWORD_REQUEST:
			state = {
				...state,
			};
			break;
		case authConstants.FORGOT_PASSWORD_FAILURE:
			state = {
				...state,
			};
			break;
		case authConstants.FORGOT_PASSWORD_SUCCESS:
			state = {
				...state,
			};
			break;
		case authConstants.RESET_PASSWORD_REQUEST:
			state = {
				...state,
			};
			break;
		case authConstants.RESET_PASSWORD_FAILURE:
			state = {
				...state,
			};
			break;
		case authConstants.RESET_PASSWORD_SUCCESS:
			state = {
				...state,
			};
			break;
		case authConstants.UPDATE_EMAIL:
			state = {
				...state,
				user: {
					...state.user,
					email: action.payload.user,
				},
			};
			break;
		default:
			break;
	}
	return state;
};
