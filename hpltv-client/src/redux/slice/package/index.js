import { createSlice } from '@reduxjs/toolkit';
import { fetchAllPackage } from '../../action/package/index';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const PackageSlice = createSlice({
  name: 'PackageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all comment
    builder.addCase(fetchAllPackage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPackage.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllPackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
