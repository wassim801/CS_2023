import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/product/productSlice'
import customerReducer from '../features/cutomers/customerSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice';
import colorReducer from "../features/color/colorSlice"
import ratingReducer from "../features/rating/ratingSlice"
import cartReducer from "../features/cart/cartSlice"
import orderReducer from "../features/order/orderSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth : authReducer,
    product: productReducer,
    customer: customerReducer,
    wishlist : wishlistReducer,
    color : colorReducer,
    rating : ratingReducer,
    cart : cartReducer,
    order : orderReducer,


  },
});
