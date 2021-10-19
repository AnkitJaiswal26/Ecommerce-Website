import { authReducer } from "./auth.reducer";
import { combineReducers } from "redux";
import { productReducer } from "./products.reducer";
import { cartReducer } from "./cart.reducers";

export const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart : cartReducer,
});