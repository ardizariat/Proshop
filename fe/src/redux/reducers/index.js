import { productListReducer, productDetailsReducer } from './productReducers'
import { cartReducer } from './cartReducers'
import { userLoginReducer } from './userReducers'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
})

export default reducer
