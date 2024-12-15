import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_ALL_SUBSCRIBER,
  API_RESET_PASSWORD,
  API_DELETE_USER,
  API_GET_BANNED_SUBSCRIBER,
} from '../../../configs/apis';

export const fetchAllSubscriber = createAsyncThunk(
  'fetchAllSubscriber',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_ALL_SUBSCRIBER +
        '/from-page?banned=false' +
        '&limit=' +
        process.env.REACT_APP_SIZE_PAGE +
        '&page=' +
        size,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const fetchAllSubscriberLook = createAsyncThunk(
  'fetchAllSubscriberLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_ALL_SUBSCRIBER +
        '/fetch-look?banned=false&firstName=' +
        data.firstName +
        '&lastName=' +
        data.lastName +
        '&email=' +
        data.email +
        '&gender=' +
        data.gender +
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

export const resetPasswordSubscriber = createAsyncThunk(
  'resetPasswordSubscriber',
  async (dataUser, { rejectWithValue }) => {
    const response = await fetch(API_RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(dataUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    const newData = {
      userId: dataUser.userId,
      newPassword: data.newPassword,
    };
    return newData;
  },
);

export const deleteSubscriber = createAsyncThunk(
  'deleteSubscriber',
  async (dataUser, { rejectWithValue }) => {
    const response = await fetch(API_DELETE_USER, {
      method: 'POST',
      body: JSON.stringify(dataUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }

    return dataUser.userId;
  },
);

export const postBannedSubscriber = createAsyncThunk(
  'postBannedSubscriber',
  async (dataUser, { rejectWithValue }) => {
    const response = await fetch(API_GET_BANNED_SUBSCRIBER, {
      method: 'POST',
      body: JSON.stringify(dataUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return dataUser.userId;
  },
);
