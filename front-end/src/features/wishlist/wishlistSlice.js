import { createSlice, createAsyncThunk ,createAction} from "@reduxjs/toolkit";
import wishlistService from "./wishlistService";

export const addToWishlist = createAsyncThunk(
  "wishlist/add-wishlist",
  async (prodId,thunkAPI) => {
    try {
      return await wishlistService.addToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getWishlist = createAsyncThunk(
  "wishlist/get-wishlist",
  async (thunkAPI) => {
    try {
      return await wishlistService.getWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetStateWishlist = createAction("Reset_all");


const initialState = {
   wishlist :[], 
   addWishlist:{},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addWishlist= action.payload
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(resetStateWishlist, () => initialState);
      
      
  },
});
export default wishlistSlice.reducer;
