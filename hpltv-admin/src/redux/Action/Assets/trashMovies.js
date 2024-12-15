import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_MOVIES,
  API_DELETE_MOVIES,
  API_RECOVER_MOVIES,
} from '../../../configs/apis';

export const fetchAllMoviesTrash = createAsyncThunk(
  'fetchAllMoviesTrash',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_MOVIES +
        '/from-page?trash=true&limit=' +
        process.env.REACT_APP_SIZE_PAGE +
        '&page=' +
        size,
    );
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const fetchAllMoviesTrashLook = createAsyncThunk(
  'fetchAllMoviesTrashLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_MOVIES +
        '/fetch-look?trash=true&country=' +
        data.valueCountries +
        '&name=' +
        data.textLook +
        '&limit=' +
        process.env.REACT_APP_SIZE_PAGE +
        '&page=' +
        data.pageNum,
    );
    const dataJson = await response.json();
    if (!dataJson.success) {
      rejectWithValue(dataJson);
    }
    return dataJson;
  },
);

export const deleteTrashMovies = createAsyncThunk(
  'deleteTrashMovies',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_DELETE_MOVIES + '/' + data.dataId, {
      method: 'POST',
      body: JSON.stringify({ type: data.type }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return data.dataId;
  },
);

export const postRecoverMovies = createAsyncThunk(
  'postRecoverMovies',
  async (Data, { rejectWithValue }) => {
    const response = await fetch(API_RECOVER_MOVIES, {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return Data.dataId;
  },
);
