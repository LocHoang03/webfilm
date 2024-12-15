import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllSeries,
  createSeries,
  deleteSeries,
  updateSeries,
  addManySeries,
  fetchAllSeriesLook,
} from '../../Action/Assets/series';

const initialState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
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
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //fetch look
    builder.addCase(fetchAllSeriesLook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSeriesLook.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllSeriesLook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // create a new series
    builder.addCase(createSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count + 1;
      state.data.unshift(action.payload.data);
    });
    builder.addCase(createSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete series
    builder.addCase(deleteSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count - 1;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // update a  series
    builder.addCase(updateSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.data.map((data) => {
        if (data._id === action.payload.data._id) {
          data.title = action.payload.data.title;
          data.description = action.payload.data.description;
          data.imageUrl = action.payload.data.imageUrl;
          data.videoUrl = action.payload.data.videoUrl;
          // data.listSeriesId = action.payload.data.listSeriesId;
          data.releaseDate = action.payload.data.releaseDate;
          data.director = action.payload.data.director;
          data.cast = action.payload.data.cast;
          data.country = action.payload.data.country;
          data.listCategoryId = action.payload.data.listCategoryId;
          data.listPackageIdBand = action.payload.data.listPackageIdBand;
        }
      });
    });
    builder.addCase(updateSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // add many series
    builder.addCase(addManySeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addManySeries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(addManySeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
