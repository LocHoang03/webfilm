import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_MOVIES,
  API_MOVIES_FEATURE,
  API_HANDLE_LIKE_MOVIES,
  API_HANDLE_RATING_MOVIES,
} from '../../../configs/apis';

export const fetchAllMovies = createAsyncThunk(
  'fetchAllMovies',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_MOVIES);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const fetchMoviesFeature = createAsyncThunk(
  'fetchMoviesFeature',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_MOVIES_FEATURE);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const handleLikeMovies = createAsyncThunk(
  'handleLikeMovies',
  async (dataPost, { rejectWithValue }) => {
    const response = await fetch(API_HANDLE_LIKE_MOVIES, {
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

export const handleRatingMoviesAction = createAsyncThunk(
  'HandleRatingMoviesAction',
  async (dataPost, { rejectWithValue }) => {
    const response = await fetch(API_HANDLE_RATING_MOVIES, {
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
