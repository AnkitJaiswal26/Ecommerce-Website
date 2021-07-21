import axios from 'axios';
import { productContants } from './constants';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/products/')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: {
                message: "Success!",
                data:res.data,
            }
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addItem = (item) => (dispatch) => {
    axios.post('/api/products', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch({type:productContants.ADD_ITEM_FAILURE, payload:{message:"Unsuccessful addition...."}}))
}

export const deleteItem = (id) => (dispatch) => {
    axios.delete(`/api/products/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const updateItem = (id, item) => (dispatch) => {
    axios.put(`/api/products/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: Promise.all([id, res.data])
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}