import { createSlice } from '@reduxjs/toolkit';
import { fetchMoviesMostView } from '../../../action/film/MostView/index';
import { fetchSeriesMostNew } from '../../../action/film/MostNew';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const MoviesMostViewSlice = createSlice({
  name: 'MoviesMostNewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all movies
    builder.addCase(fetchMoviesMostView.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMoviesMostView.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchMoviesMostView.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const SeriesMostViewSlice = createSlice({
  name: 'SeriesMostViewSlice',
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
