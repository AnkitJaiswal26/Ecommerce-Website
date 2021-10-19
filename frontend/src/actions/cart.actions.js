import {cartConstants} from './constants.js';
import axios from 'axios';

export const addToCart = (id,qty) => async (dispatch) => {

    console.log('Hello from cart actions',id,qty);
    const { data } =  await axios.get(`/product/${id}`);

    dispatch({
        type : cartConstants.CART_ADD_ITEM,
        payload : {
            item : {
                product : data._id,
                name : data.name,
                image : data.productImages[0].img,
                price : data.price,
                qty
            }
        }
    })
}

export const removeFromCart = (id) => (dispatch) => {

    dispatch({
        type : cartConstants.CART_REMOVE_ITEM,
        payload : {
            id
        }
    })
}