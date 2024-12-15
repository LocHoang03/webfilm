import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllSeries,
  fetchSeriesFeature,
  handleLikeSeries,
  handleRatingSeriesAction,
} from '../../action/home/series';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const SeriesSlice = createSlice({
  name: 'SeriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //fetch series feature
    builder.addCase(fetchSeriesFeature.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSeriesFeature.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchSeriesFeature.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // handle user like series
    builder.addCase(handleLikeSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleLikeSeries.fulfilled, (state, action) => {
      state.loading = false;
      const updatedData = action.payload.data;
      state.data = state.data.map((item) =>
        item._id === updatedData._id ? updatedData : item,
      );
    });
    builder.addCase(handleLikeSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // handle user rating series
    builder.addCase(handleRatingSeriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleRatingSeriesAction.fulfilled, (state, action) => {
      state.loading = false;
      const updatedData = action.payload.data;
      state.data = state.data.map((item) =>
        item._id === updatedData._id ? updatedData : item,
      );
    });
    builder.addCase(handleRatingSeriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
