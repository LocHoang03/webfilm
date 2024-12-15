import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_MOVIES_MOST_RATING,
  API_SERIES_MOST_RATING,
} from '../../../../configs/apis';

export const fetchMoviesMostRating = createAsyncThunk(
  'fetchMoviesMostRating',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_MOVIES_MOST_RATING);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const fetchSeriesMostRating = createAsyncThunk(
  'fetchSeriesMostRating',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_SERIES_MOST_RATING);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);
