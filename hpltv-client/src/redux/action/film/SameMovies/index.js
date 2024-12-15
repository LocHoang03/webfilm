import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_MOVIES_CAN_TO_MATCH,
  API_SERIES_CAN_TO_MATCH,
} from '../../../../configs/apis';

export const fetchMoviesSameMovies = createAsyncThunk(
  'fetchMoviesSameMovies',
  async (filmId, { rejectWithValue }) => {
    const response = await fetch(API_MOVIES_CAN_TO_MATCH + '/' + filmId);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const fetchSeriesSameSeries = createAsyncThunk(
  'fetchSeriesSameSeries',
  async (filmId, { rejectWithValue }) => {
    const response = await fetch(API_SERIES_CAN_TO_MATCH + '/' + filmId);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);
