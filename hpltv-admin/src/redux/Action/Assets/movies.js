import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_MOVIES,
  API_CREATE_MOVIES,
  API_UPDATE_MOVIES,
  API_DELETE_MOVIES,
} from '../../../configs/apis';

export const fetchAllMovies = createAsyncThunk(
  'fetchAllMovies',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_MOVIES +
        '/from-page?trash=false&limit=' +
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

export const fetchAllMoviesLook = createAsyncThunk(
  'fetchAllMoviesLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_MOVIES +
        '/fetch-look?trash=false&country=' +
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

export const createMovies = createAsyncThunk(
  'createMovies',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_CREATE_MOVIES, {
      method: 'POST',
      body: data,
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

export const deleteMovies = createAsyncThunk(
  'deleteMovies',
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

export const updateMovies = createAsyncThunk(
  'updateMovies',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_UPDATE_MOVIES + '/' + data.Id, {
      method: 'POST',
      body: data.formData,
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

// export const addManyMovies = createAsyncThunk(
//   'addManyMovies',
//   async (data, { rejectWithValue }) => {
//     const response = await fetch(process.env.REACT_APP_API_ADD_MANY_MOVIES, {
//       method: 'POST',
//       body: data,
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
//       },
//     });
//     console.log('response', response);
//     const json = await response.json();
//     console.log('json', json);
//     if (!json.success) {
//       rejectWithValue(json);
//     }
//     return json;
//   },
// );
