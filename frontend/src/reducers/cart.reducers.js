import { cartConstants } from "../actions/constants";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.CART_ADD_ITEM:
        // console.log('Hi from reducers');
      const item = action.payload.item;

      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? item : x
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, item],
        };
      }
    
    case cartConstants.CART_REMOVE_ITEM:
        return {
            cartItems : state.cartItems.filter((x) => x.product !== action.payload.id)
        };

    default:
        return state;
    }
};
