import { cartConstants } from "../actions/constants";

const initialState = {
  cartItems: [{
    product: "61798e776e86363cd2d58260",
    name: "Alisha Solid Women's Cycling Shorts",
    image: "http://img5a.flixcart.com/image/short/u/4/a/altht-3p-21-alisha-38-original-imaeh2d5vm5zbtgg.jpeg",
    price: '999.0',
    brand: "Alisha",
    qty: 1
  }],
};

export const cartReducer = (state = initialState, action) => {
  let existingItem, newItem, id;

  switch (action.type) {
    case cartConstants.CART_ADD_ITEM:
      // console.log("Hi from reducers");

      const item = action.payload.item;

      existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );

      if (existingItem) {
        newItem = { ...existingItem, qty: existingItem.qty + 1 };
        // console.log('Quantity exists:',existingItem.qty);
        // console.log(newItem);
        state = {
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? newItem : x
          ),
        };
      } else {
        state = {
          cartItems: [...state.cartItems, item],
        };
      }
      break;
    case cartConstants.CART_REMOVE_ITEM:
      state = {
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload.id
        ),
      };
      break;
    
    case cartConstants.CART_ADD_ONE:
      id = action.payload.id;

      existingItem = state.cartItems.find(
        (x) => x.product === id
      );

      newItem = { ...existingItem, qty: existingItem.qty + 1 };
      state = {
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? newItem : x
          ),
        };
      break;
    
    case cartConstants.CART_REMOVE_ONE:
      id = action.payload.id;

      existingItem = state.cartItems.find(
        (x) => x.product === id
      );
      
      newItem = (existingItem.qty - 1 <= 0) ? existingItem : { ...existingItem, qty: existingItem.qty - 1 };
      // newItem = { ...existingItem, qty: existingItem.qty - 1 };
      state = {
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? newItem : x
          ),
        };
      break;

    default:
      return state;
  }
  return state;
};
