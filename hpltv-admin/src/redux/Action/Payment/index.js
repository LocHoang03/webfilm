import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_DATA_PAYMENT,
  API_GET_ADMIN_PAYMENT,
} from '../../../configs/apis';

export const fetchAllOrder = createAsyncThunk(
  'fetchAllOrder',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_DATA_PAYMENT +
        '/from-page?limit=' +
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

export const fetchAllOrderLook = createAsyncThunk(
  'fetchAllOrderLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_DATA_PAYMENT +
        '/fetch-look?trash=false&package=' +
        data.valuePackage +
        '&firstName=' +
        data.firstName +
        '&lastName=' +
        data.lastName +
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

export const createPayment = createAsyncThunk(
  'createPayment',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_GET_ADMIN_PAYMENT + '/create-payment', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
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
