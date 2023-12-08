import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import customerService from "./customerService";

export const getUsers = createAsyncThunk(
  "customer/get-customers",
  async (thunkAPI) => {
    try {
      return await customerService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUser = createAsyncThunk(
  "customer/get-customer",
  async (userData,thunkAPI) => {
    try {
      return await customerService.getUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addAddress = createAsyncThunk(
  "customer/add-address",
  async (userData,thunkAPI) => {
    try {
      return await customerService.addAddress(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetCustomerAdr = createAction("customer/reset-customerAdr");

const initialState = {
  customers: [],
  customer: [],
  customerAdr:{},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customer = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;

      })  .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customerAdr = action.payload;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;

      });
      
  },
});
export default customerSlice.reducer;
export const customerAdrReducer = (state = initialState.customerAdr, action) => {
  switch (action.type) {
    case resetCustomerAdr.type:
      return initialState.customerAdr;
    default:
      return state;
  }
};
