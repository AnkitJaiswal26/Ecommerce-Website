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
	error: null,
	message: "",
};

export const authReducer = (state = initState, action) => {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return state = {
				...state,
				message: "",
				error: null,
				authenticating: true,
			};
			break;
		case authConstants.LOGIN_SUCCESS:
			return state = {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false,
				message: action.payload.message,
			};
		case authConstants.LOGOUT_REQUEST:
			return state = {
				...state,
				error: null,
				message: "",
				loading: true,
			};
		case authConstants.LOGOUT_SUCCESS:
			return state = {
				...initState,
				message: action.payload.message,
			};
		case authConstants.LOGOUT_FAILURE:
			return state = {
				...state,
				error: action.payload.error,
				loading: false,
			};
		case authConstants.LOGIN_FAILURE:
			return state = {
				...state,
				error: action.payload.error,
				authenticating: false,
			};
		case authConstants.REGISTER_REQUEST:
			return state = {
				...state,
				error: null,
				message: "",
			};
		case authConstants.REGISTER_SUCCESS:
			return state = {
				...state,
				message: action.payload.message,
			};
		case authConstants.REGISTER_FAILURE:
			return state = {
				...state,
				error: action.payload.error,
			};
        case authConstants.ACTIVATION_REQUEST:
            return state = {
                ...state,
                message: "",
                error: null
            }
        case authConstants.ACTIVATION_SUCCESS:
            return state = {
                ...state,
                message: action.payload.message
            }
        case authConstants.ACTIVATION_FAILURE:
            return state = {
                ...state,
                error: action.payload.error
            }
		default:
			return state;
	}
	return state;
};
