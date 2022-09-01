import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../../constants/cartConstants";
import axios from "axios";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${productId}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.data._id,
      name: data.data.name,
      image: data.data.image,
      price: data.data.price,
      countInStock: data.data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
