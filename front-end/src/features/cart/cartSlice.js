import { createSlice, createAsyncThunk ,createAction} from "@reduxjs/toolkit";
import cartService from "./cartServices";

export const addCart = createAsyncThunk(
  "cart/add-cart",
  async (cart,thunkAPI) => {
    try {
      return await cartService.addCart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getCart = createAsyncThunk(
  "cart/get-cart",
  async (thunkAPI) => {
    try {
      return await cartService.geCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const emtyCart = createAsyncThunk(
  "cart/empty-cart",
  async (thunkAPI) => {
    try {
      return await cartService.emtyCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const removeProductFromCart = createAsyncThunk(
  "cart/delete-product-cart",
  async (id,thunkAPI) => {
    try {
      return await cartService.removeProductCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetStateCart = createAction("Reset_all");
const initialState = {
  cart:[],
  updateCart:{},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateCart = action.payload;
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(emtyCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emtyCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = [];
      })
      .addCase(emtyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetStateCart, () => initialState);
      
  },
});
export default cartSlice.reducer;
