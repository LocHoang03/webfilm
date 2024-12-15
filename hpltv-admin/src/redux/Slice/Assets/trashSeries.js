import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllSeriesTrash,
  postRecoverSeries,
  deleteTrashSeries,
  fetchAllSeriesTrashLook,
} from '../../Action/Assets/trashSeries';

const initialState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
};

export const TrashSeriesSlice = createSlice({
  name: 'TrashSeriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSeriesTrash.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSeriesTrash.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllSeriesTrash.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //fetch look
    builder.addCase(fetchAllSeriesTrashLook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSeriesTrashLook.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllSeriesTrashLook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // recover series
    builder.addCase(postRecoverSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postRecoverSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(postRecoverSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // delete series
    builder.addCase(deleteTrashSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTrashSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count - 1;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteTrashSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
