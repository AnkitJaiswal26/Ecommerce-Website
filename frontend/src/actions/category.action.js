import { categoryConstants } from "./constants";
import axios from "../helpers/axios";

export const getAllCategories = () => {
	return async (dispatch) => {
		dispatch({
			type: categoryConstants.GET_ALL_CATEGORIES_REQUEST,
		});
		axios
			.get("/category")
			.then((res) => {
				dispatch({
					type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
					payload: {
						categoryList: res.data.categoryList,
					},
				});
			})
			.catch((err) => {
				const { data } = err.response;
				dispatch({
					type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
					payload: {
						error: data.error,
					},
				});
			});
	};
};

export const addCategory = (name) => {
	return async (dispatch) => {
		dispatch({
			type: categoryConstants.ADD_CATEGORY_REQUEST,
		});
		axios
			.post("/category")
			.then((res) => {
				dispatch({
					type: categoryConstants.ADD_CATEGORY_SUCCESS,
					payload: {
						message: res.data.message,
					},
				});
			})
			.catch((err) => {
				const { data } = err.response;
				dispatch({
					type: categoryConstants.ADD_CATEGORY_FAILURE,
					payload: {
						error: data.error,
					},
				});
			});
	};
};

export const deleteCategory = (id) => {
	return async (dispatch) => {
		dispatch({
			type: categoryConstants.DELETE_CATEGORY_REQUEST,
		});
		axios
			.delete(`/category/:${id}`)
			.then((res) => {
				dispatch({
					type: categoryConstants.DELETE_CATEGORY_SUCCESS,
					payload: {
						message: res.data.message,
					},
				});
			})
			.catch((err) => {
				const { data } = err.response;
				dispatch({
					type: categoryConstants.DELETE_CATEGORY_FAILURE,
					payload: {
						error: data.error,
					},
				});
			});
	};
};

export const updateCategory = (category) => {
	return async (dispatch) => {
		dispatch({
			type: categoryConstants.UPDATE_CATEGORY_REQUEST,
		});
		axios
			.post("/category/update", {
				...category,
			})
			.then((res) => {
				dispatch({
					type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
					payload: {
						category: res.data.category,
						message: res.data.message,
					},
				});
			})
			.catch((err) => {
				const { data } = err.response;
				dispatch({
					type: categoryConstants.UPDATE_CATEGORY_FAILURE,
					payload: {
						error: data.error,
					},
				});
			});
	};
};
