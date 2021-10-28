import { cartConstants } from "./constants.js";

export const addToCart = (id, img, name, price, brand, qty) => (dispatch) => {

  dispatch({
    type: cartConstants.CART_ADD_ITEM,
    payload: {
      item: {
        product: id,
        name: name,
        image: img,
        price: price,
        brand: brand,
        qty: qty,
      },
    },
  });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: cartConstants.CART_REMOVE_ITEM,
    payload: {
      id,
    },
  });
};

export const increaseByOne = (id) => (dispatch) => {
  dispatch({
    type: cartConstants.CART_ADD_ONE,
    payload:{
      id,
    }
  })
}

export const decreaseByOne = (id) => (dispatch) => {
  dispatch({
    type: cartConstants.CART_REMOVE_ONE,
    payload:{
      id,
    }
  })
}