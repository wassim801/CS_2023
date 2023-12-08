import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ratingServices from "./ratingServices";

export const addRating = createAsyncThunk(
  "rating/add-rating",
  async (productData, thunkAPI) => {
    try {
      return await ratingServices.addRating(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  product:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});
export default ratingSlice.reducer;
