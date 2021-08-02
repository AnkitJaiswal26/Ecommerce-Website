import { categoryConstants } from "../actions/constants";

const initState = {
	categories: [],
	loading: false,
	error: null,
	message: "",
};

export const categoryReducer = (state = initState, action) => {
	switch (action.type) {
		case categoryConstants.ADD_CATEGORY_REQUEST:
			state = {
				...state,
				error: null,
				message: "",
			};
			break;
		case categoryConstants.ADD_CATEGORY_SUCCESS:
			state = {
				...state,
                categories: [...state.categories, action.payload.category],
				message: action.payload.message,
			};
			break;
		case categoryConstants.ADD_CATEGORY_FAILURE:
			state = {
				...state,
				message: action.payload.error,
			};
			break;
		case categoryConstants.DELETE_CATEGORY_REQUEST:
			state = {
				...state,
				error: null,
				message: "",
			};
			break;
		case categoryConstants.DELETE_CATEGORY_SUCCESS:
			state = {
				...state,
				message: action.payload.message,
			};
			break;
		case categoryConstants.DELETE_CATEGORY_FAILURE:
			state = {
				...state,
				error: action.payload.error,
			};
			break;
		case categoryConstants.UPDATE_CATEGORY_REQUEST:
			state = {
				...state,
				error: null,
				message: "",
			};
			break;
		case categoryConstants.UPDATE_CATEGORY_SUCCESS:
			state = {
				...state,
				message: action.payload.message,
			};
			break;
		case categoryConstants.UPDATE_CATEGORY_FAILURE:
			state = {
				...state,
				error: action.payload.error,
			};
			break;
		case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
			state = {
				...state,
				error: null,
                categories: [],
				message: "",
			};
			break;
		case categoryConstants.GET_CATEGORY_BY_SLUG_SUCCESS:
			state = {
				...state,
                categories: action.payload.categories,
			};
			break;
		case categoryConstants.GET_CATEGORY_BY_SLUG_FAILURE:
			state = {
				...state,
				error: action.payload.error,
			};
			break;
		default:
			break;
	}
	return state;
};
