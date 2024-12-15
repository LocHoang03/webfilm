import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllFilmForSeriesTrash,
  postRecoverFilmForSeries,
  deleteTrashFilmForSeries,
} from '../../Action/Assets/trashFilmForSeries';

const initialState = {
  data: [],
  count: 0,
  loading: false,
  error: null,
};

export const TrashFilmForSeriesSlice = createSlice({
  name: 'TrashFilmForSeriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all film
    builder.addCase(fetchAllFilmForSeriesTrash.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllFilmForSeriesTrash.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllFilmForSeriesTrash.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // recover film
    builder.addCase(postRecoverFilmForSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postRecoverFilmForSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(postRecoverFilmForSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete film
    builder.addCase(deleteTrashFilmForSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTrashFilmForSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count - 1;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteTrashFilmForSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
