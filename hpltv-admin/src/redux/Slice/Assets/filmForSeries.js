import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllFilmForSeries,
  createFilmForSeries,
  updateFilmForSeries,
  deleteFilmForSeries,
} from '../../Action/Assets/filmForSeries';

const initialState = {
  data: [],
  count: 0,
  loading: false,
  error: null,
};

export const FilmForSeriesSlice = createSlice({
  name: 'FilmForSeriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all film
    builder.addCase(fetchAllFilmForSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllFilmForSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllFilmForSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // create a new film
    builder.addCase(createFilmForSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createFilmForSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count + 1;
      state.data.unshift(action.payload.data);
    });
    builder.addCase(createFilmForSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // update a film
    builder.addCase(updateFilmForSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFilmForSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.data.map((data) => {
        if (data._id === action.payload.data._id) {
          data.releaseDate = action.payload.data.releaseDate;
          data.filmSerialNumber = action.payload.data.filmSerialNumber;
          data.duration = action.payload.data.duration;
          data.videoUrl = action.payload.data.videoUrl;
          data.updateAt = action.payload.data.updateAt;
          data.seriesId = action.payload.data.seriesId;
        }
      });
    });
    builder.addCase(updateFilmForSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete film
    builder.addCase(deleteFilmForSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFilmForSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count - 1;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteFilmForSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
