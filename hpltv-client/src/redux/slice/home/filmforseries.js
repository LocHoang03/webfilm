import { createSlice } from '@reduxjs/toolkit';
import { fetchAllFilmForSeries } from '../../action/home/filmforseries';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const FilmForSeriesSlice = createSlice({
  name: 'FilmForSeriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all movies
    builder.addCase(fetchAllFilmForSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllFilmForSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllFilmForSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
