import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMoviesMostNew,
  fetchSeriesMostNew,
} from '../../../action/film/MostNew/index';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const MoviesMostNewSlice = createSlice({
  name: 'MoviesMostNewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all movies
    builder.addCase(fetchMoviesMostNew.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMoviesMostNew.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchMoviesMostNew.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const SeriesMostNewSlice = createSlice({
  name: 'SeriesMostNewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all series
    builder.addCase(fetchSeriesMostNew.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSeriesMostNew.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchSeriesMostNew.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
