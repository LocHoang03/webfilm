import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_SERIES,
  API_DELETE_SERIES,
  API_RECOVER_SERIES,
} from '../../../configs/apis';

export const fetchAllSeriesTrash = createAsyncThunk(
  'fetchAllSeriesTrash',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES +
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

export const fetchAllSeriesTrashLook = createAsyncThunk(
  'fetchAllSeriesTrashLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES +
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

export const deleteTrashSeries = createAsyncThunk(
  'deleteTrashSeries',
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

export const postRecoverSeries = createAsyncThunk(
  'postRecoverSeries',
  async (Data, { rejectWithValue }) => {
    const response = await fetch(API_RECOVER_SERIES, {
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
