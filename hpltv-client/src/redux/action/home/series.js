import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_HANDLE_LIKE_SERIES,
  API_HANDLE_RATING_SERIES,
  API_SERIES,
  API_SERIES_FEATURE,
} from '../../../configs/apis';

export const fetchAllSeries = createAsyncThunk(
  'fetchAllSeries',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_SERIES);
    const data = await response.json();

    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const fetchSeriesFeature = createAsyncThunk(
  'fetchSeriesFeature',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_SERIES_FEATURE);
    const data = await response.json();

    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const handleLikeSeries = createAsyncThunk(
  'handleLikeSeries',
  async (dataPost, { rejectWithValue }) => {
    const response = await fetch(API_HANDLE_LIKE_SERIES, {
      method: 'POST',
      body: JSON.stringify(dataPost),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();

    if (!data.success) {
      rejectWithValue(dataPost);
    }
    return data;
  },
);

export const handleRatingSeriesAction = createAsyncThunk(
  'handleRatingSeriesAction',
  async (dataPost, { rejectWithValue }) => {
    const response = await fetch(API_HANDLE_RATING_SERIES, {
      method: 'POST',
      body: JSON.stringify(dataPost),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(dataPost);
    }
    return data;
  },
);
