import {productContants} from '../actions/constants'

const initState = {
    productList:[],
	loading: false,
	error: null,
	message: "",
    req_res : null
};

export const productReducer = (state=initState, action) => {
    switch (action.type) {
        case productContants.GET_ITEMS:
            state={
                ...state,
                message: action.payload.message,
                productList: action.payload.data
            }
        case productContants.ADD_ITEMS:
            state={
                ...state,
                req_res: action.payload,
            }
        case productContants.DELETE_ITEM:
            state={
                ...state,
                req_res: action.payload
            }
        case productContants.UPDATE_ITEM:
            state={
                ...state,
                req_res: action.payload
            }
        default:
            return state;
    }
}