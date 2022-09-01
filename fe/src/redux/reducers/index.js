import { productListReducer, productDetailsReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";
import { combineReducers } from "redux";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

export default reducer;
