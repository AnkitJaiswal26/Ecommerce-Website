import { authConstants } from "../actions/constants";

const initState = {
	token: null,
	user: {
		userName: "",
		email: "",
		profilePicture: "",
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
			state = {
				...state,
                message: "",
                error: null,
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
				message: action.payload.message,
			};
			break;
		case authConstants.LOGOUT_REQUEST:
			state = {
				...state,
                error: null,
                message: "",
				loading: true,
			};
			break;
		case authConstants.LOGOUT_SUCCESS:
			state = {
				...initState,
                message: action.payload.message
			};
			break;
		case authConstants.LOGOUT_FAILURE:
			state = {
				...state,
				error: action.payload.error,
				loading: false,
			};
			break;
		case authConstants.LOGIN_FAILURE:
			state = {
				...state,
				error: action.payload.error,
				authenticating: false,
			};
			break;
		case authConstants.REGISTER_REQUEST:
            state = {
                ...state,
                error: null,
                message: ""
            }
			break;
		case authConstants.REGISTER_SUCCESS:
			state = {
				...state,
				message: action.payload.message,
			};
			break;
		case authConstants.REGISTER_FAILURE:
			state = {
				...state,
				error: action.payload.error,
			};
			break;
        case authConstants.ACTIVATION_REQUEST:
            state = {
                ...state,
                message: "",
                error: null
            }
            break;
        case authConstants.ACTIVATION_SUCCESS:
            state = {
                ...state,
                message: action.payload.message
            }
            break;
        case authConstants.ACTIVATION_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break
		default:
	}
};
