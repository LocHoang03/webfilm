import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMoviesMostRating,
  fetchSeriesMostRating,
} from '../../../action/film/MostRating';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const MoviesMostRatingSlice = createSlice({
  name: 'MoviesMostRatingSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all movies
    builder.addCase(fetchMoviesMostRating.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMoviesMostRating.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchMoviesMostRating.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const SeriesMostRatingSlice = createSlice({
  name: 'SeriesMostRatingSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all series
    builder.addCase(fetchSeriesMostRating.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSeriesMostRating.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchSeriesMostRating.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
