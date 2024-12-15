import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCustomerQuestions,
  resolveCustomerQuestions,
} from '../../Action/Setting/customerQuestion';

const initialState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
};

export const CustomerQuestionsSlice = createSlice({
  name: 'CustomerQuestionsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all common questions
    builder.addCase(fetchAllCustomerQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCustomerQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllCustomerQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // explain
    builder.addCase(resolveCustomerQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resolveCustomerQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count - 1;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(resolveCustomerQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
