import {productContants} from '../actions/constants'

const initState = {
    productList:[],
	loading: false,
	error: null,
	message: "",
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
                message: action.payload.message,
                productList: action.payload.data
            }
        case productContants.GET_ITEMS:
            state={
                ...state,
                message: action.payload.message,
                productList: action.payload.data
            }
        case productContants.GET_ITEMS:
            state={
                ...state,
                message: action.payload.message,
                productList: action.payload.data
            }
    }
}