import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_SERIES } from '../../../configs/apis';

export const fetchAllFilmForSeries = createAsyncThunk(
  'fetchAllFilmForSeries',
  async (dataFilm, { rejectWithValue }) => {
    const response = await fetch(API_SERIES + '/' + dataFilm);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);
