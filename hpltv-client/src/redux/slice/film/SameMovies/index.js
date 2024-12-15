import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMoviesSameMovies,
  fetchSeriesSameSeries,
} from '../../../action/film/SameMovies';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const SameMoviesSlice = createSlice({
  name: 'SameMoviesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all movies
    builder.addCase(fetchMoviesSameMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMoviesSameMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchMoviesSameMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const SameSeriesSlice = createSlice({
  name: 'SameSeriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all series
    builder.addCase(fetchSeriesSameSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSeriesSameSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchSeriesSameSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
