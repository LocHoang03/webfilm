import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllMovies,
  fetchMoviesFeature,
  handleLikeMovies,
  handleRatingMoviesAction,
} from '../../action/home/movies';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const MoviesSlice = createSlice({
  name: 'MoviesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all movies
    builder.addCase(fetchAllMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // fetch movies feature
    builder.addCase(fetchMoviesFeature.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMoviesFeature.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchMoviesFeature.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // handle user like movies
    builder.addCase(handleLikeMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleLikeMovies.fulfilled, (state, action) => {
      state.loading = false;
      const updatedData = action.payload.data;
      state.data = state.data.map((item) =>
        item._id === updatedData._id ? updatedData : item,
      );
    });
    builder.addCase(handleLikeMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // handle user rating movies
    builder.addCase(handleRatingMoviesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleRatingMoviesAction.fulfilled, (state, action) => {
      state.loading = false;
      const updatedData = action.payload.data;
      state.data = state.data.map((item) =>
        item._id === updatedData._id ? updatedData : item,
      );
    });
    builder.addCase(handleRatingMoviesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
