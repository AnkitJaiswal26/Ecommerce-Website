import { authReducer } from "./auth.reducer";
import { combineReducers } from "redux";
import { productReducer } from "./products.reducer";

export const rootReducer = combineReducers({
	auth: authReducer,
	products: productReducer
});