import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCategory } from '../../action/category/category';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const CategorySlice = createSlice({
  name: 'CategorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all category
    builder.addCase(fetchAllCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
