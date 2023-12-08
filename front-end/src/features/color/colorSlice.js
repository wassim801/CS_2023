import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorServices from "./colorServices";

export const getColorList = createAsyncThunk(
  "color/get-colorlist",
  async (userData,thunkAPI) => {
    try {
      return await colorServices.getColorList(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllColors = createAsyncThunk(
  "color/get-All-Colors",
  async (userData,thunkAPI) => {
    try {
      return await colorServices.getAllColor();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  colorList:[],
  allColors:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColorList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColorList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorList = action.payload;
      })
      .addCase(getColorList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })  .addCase(getAllColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allColors = action.payload;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
      
  },
});
export default colorSlice.reducer;
