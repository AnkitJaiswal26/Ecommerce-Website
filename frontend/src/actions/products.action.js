import axios from "../helpers/axios";
import { productConstants } from "./constants";
// import { returnErrors } from "./errorActions";

export const getItems = () => (dispatch) => {
	dispatch(setItemsLoading());
	// console.log("Hi from actions")
	axios
		.get("product/all")
		.then((res) =>
			{
				// console.log("Hi from actions");
				// console.log(res.data)
				dispatch({
				type: productConstants.GET_ITEMS,
				payload: {
					message: "Success!",
					data: res.data.products,
				},
			})}
		)
		// .catch((err) =>
		// 	dispatch(returnErrors(err.response.data, err.response.status))
		// );

};

export const addItem = (item) => (dispatch) => {
	axios
		.post("/api/products", item)
		.then((res) =>
			dispatch({
				type: productConstants.ADD_ITEM,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: productConstants.ADD_ITEM_FAILURE,
				payload: { message: "Unsuccessful addition...." },
			})
		);
};

// export const deleteItem = (id) => (dispatch) => {
// 	axios
// 		.delete(`/api/products/${id}`)
// 		.then((res) =>
// 			dispatch({
// 				type: productConstants.DELETE_ITEM,
// 				payload: id,
// 			})
// 		)
// 		.catch((err) =>
// 			dispatch(returnErrors(err.response.data, err.response.status))
// 		);
// };

export const updateItem = (id, item) => (dispatch) => {
	axios
		.put(`/api/products/${id}`, item)
		.then((res) =>
			dispatch({
				type: productConstants.UPDATE_ITEM,
				payload: Promise.all([id, res.data]),
			})
		)
		// .catch((err) =>
		// 	dispatch(returnErrors(err.response.data, err.response.status))
		// );
};

export const setItemsLoading = () => {
	return {
		type: productConstants.ITEMS_LOADING,
	};
};
