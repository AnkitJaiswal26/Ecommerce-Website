import {productConstants} from "../actions/constants"

const initState = {
    productList:[],
	loading: false,
	error: null,
	message: "",
    req_res : null
};

export const productReducer = (state=initState, action) => {
    switch (action.type) {
        case productConstants.GET_ITEMS:
            state={
                ...state,
                message: action.payload.message,
                productList: action.payload.data
            }
            break;
        case productConstants.ADD_ITEMS:
            state={
                ...state,
                req_res: action.payload,
            }
            break;
        case productConstants.DELETE_ITEM:
            state={
                ...state,
                req_res: action.payload
            }
            break;
        case productConstants.UPDATE_ITEM:
            state={
                ...state,
                req_res: action.payload
            }
            break;
        default:
            return state;
    }
}