import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPackage,
  fetchAllPackageLook,
  updatePackage,
} from '../../Action/Package/index';

const initialState = {
  data: [],
  count: 0,
  loading: false,
  error: null,
};

export const PackageSlice = createSlice({
  name: 'PackageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all package
    builder.addCase(fetchAllPackage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPackage.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllPackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // fetch all package look
    builder.addCase(fetchAllPackageLook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPackageLook.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllPackageLook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // update package
    builder.addCase(updatePackage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePackage.fulfilled, (state, action) => {
      state.loading = false;
      state.data.map((data) => {
        if (data._id === action.payload.data._id) {
          data.typePack = action.payload.data.typePack;
          data.qualityPicture = action.payload.data.qualityPicture;
          data.resolution = action.payload.data.resolution;
          data.deviceSupport = action.payload.data.deviceSupport;
          data.quantityWatch = action.payload.data.quantityWatch;
          data.quantityDownload = action.payload.data.quantityDownload;
        }
      });
    });
    builder.addCase(updatePackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
