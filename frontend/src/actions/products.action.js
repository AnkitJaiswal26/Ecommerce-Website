import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getItems = () => async (dispatch) => {
  const { data } = await axios.get("product/all");
  dispatch({
    type: productConstants.GET_ITEMS,
    payload: {
      products: data.products,
      // products: data.products.slice(0, 24),
    },
  });
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


export const updateItem = (id, item) => (dispatch) => {
  axios.put(`/product/${id}`, item).then((res) =>
    dispatch({
      type: productConstants.UPDATE_ITEM,
      payload: Promise.all([id, res.data]),
    })
  );
};
