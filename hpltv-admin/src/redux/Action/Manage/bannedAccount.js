import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_ALL_SUBSCRIBER,
  API_GET_RECOVER_SUBSCRIBER,
} from '../../../configs/apis';

export const fetchAllSubscriberBanned = createAsyncThunk(
  'fetchAllSubscriberBanned',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_ALL_SUBSCRIBER +
        '/from-page?banned=true' +
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

export const fetchAllSubscriberBannedLook = createAsyncThunk(
  'fetchAllSubscriberBannedLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_ALL_SUBSCRIBER +
        '/fetch-look?banned=true&firstName=' +
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

export const postRecoverSubscriber = createAsyncThunk(
  'postRecoverSubscriber',
  async (dataUser, { rejectWithValue }) => {
    const response = await fetch(API_GET_RECOVER_SUBSCRIBER, {
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
