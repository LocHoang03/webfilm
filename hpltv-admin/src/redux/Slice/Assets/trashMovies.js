import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllMoviesTrash,
  postRecoverMovies,
  deleteTrashMovies,
  fetchAllMoviesTrashLook,
} from '../../Action/Assets/trashMovies';

const initialState = {
  data: [],
  count: 0,
  loading: false,
  error: null,
};

export const TrashMoviesSlice = createSlice({
  name: 'TrashMoviesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all movies
    builder.addCase(fetchAllMoviesTrash.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllMoviesTrash.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllMoviesTrash.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // fetch all movies look
    builder.addCase(fetchAllMoviesTrashLook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllMoviesTrashLook.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllMoviesTrashLook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // recover movies
    builder.addCase(postRecoverMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postRecoverMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(postRecoverMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete movies
    builder.addCase(deleteTrashMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTrashMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count - 1;
      state.data = state.data.filter((data) => {
        return data._id !== action.payload;
      });
    });
    builder.addCase(deleteTrashMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
