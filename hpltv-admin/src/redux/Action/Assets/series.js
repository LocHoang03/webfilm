import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_SERIES,
  API_CREATE_SERIES,
  API_DELETE_SERIES,
  API_UPDATE_SERIES,
  API_ADD_MANY_SERIES,
} from '../../../configs/apis';

export const fetchAllSeries = createAsyncThunk(
  'fetchAllSeries',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES +
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

export const fetchAllSeriesLook = createAsyncThunk(
  'fetchAllSeriesLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES +
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

export const createSeries = createAsyncThunk(
  'createSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_CREATE_SERIES, {
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

export const deleteSeries = createAsyncThunk(
  'deleteSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_DELETE_SERIES + '/' + data.dataId, {
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

export const updateSeries = createAsyncThunk(
  'updateSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_UPDATE_SERIES + '/' + data.Id, {
      method: 'PATCH',
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

export const addManySeries = createAsyncThunk(
  'addManySeries',
  async (data, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', data);
    const response = await fetch(API_ADD_MANY_SERIES, {
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
