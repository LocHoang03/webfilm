import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_SERIES,
  API_SERIES_ADMIN,
  API_ADD_MANY_MOVIES,
} from '../../../configs/apis';
export const fetchAllFilmForSeries = createAsyncThunk(
  'fetchAllFilmForSeries',
  async (size, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_SERIES}/${size.value}/from-page?trash=false&limit=${process.env.REACT_APP_SIZE_PAGE}&page=${size.pageNum}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createFilmForSeries = createAsyncThunk(
  'createFilmForSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES_ADMIN + '/' + data.seriesId + '/create-film',
      {
        method: 'POST',
        body: data.formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);

export const deleteFilmForSeries = createAsyncThunk(
  'deleteFilmForSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES_ADMIN + '/' + data.seriesId + '/delete-film/' + data.dataId,
      {
        method: 'POST',
        body: JSON.stringify({ type: data.type }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return data.dataId;
  },
);

export const updateFilmForSeries = createAsyncThunk(
  'updateFilmForSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES_ADMIN + '/' + data.seriesId + '/update-film/' + data.Id,
      {
        method: 'POST',
        body: data.formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);

export const addManyFilmForSeries = createAsyncThunk(
  'addManyFilmForSeries',
  async (data, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', data);
    const response = await fetch(API_ADD_MANY_MOVIES, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);
