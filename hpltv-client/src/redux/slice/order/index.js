import { createSlice } from '@reduxjs/toolkit';
import { fetchAllOrder, fetchOrderFromUserId } from '../../action/order/index';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const OrderSlice = createSlice({
  name: 'OrderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all order
    builder.addCase(fetchAllOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // fetch order user
    builder.addCase(fetchOrderFromUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderFromUserId.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload && typeof action.payload.data === 'object') {
        state.data = [action.payload.data];
      } else {
        state.data = [...action.payload.data];
      }
    });
    builder.addCase(fetchOrderFromUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
