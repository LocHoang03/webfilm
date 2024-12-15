import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_ALL_USER,
  API_RESET_PASSWORD,
  API_DELETE_USER,
} from '../../../configs/apis';

export const fetchAllUser = createAsyncThunk(
  'fetchAllUser',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_ALL_USER +
        '/from-page?limit=' +
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
    console.log(data);
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const fetchAllUserLook = createAsyncThunk(
  'fetchAllUserLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_ALL_USER +
        '/fetch-look?firstName=' +
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

export const createUser = createAsyncThunk(
  'createUser',
  async (dataUser, { rejectWithValue }) => {
    return dataUser;
  },
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (userData, { rejectWithValue }) => {
    return userData;
  },
);

export const resetPasswordUser = createAsyncThunk(
  'resetPasswordUser',
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

export const deleteUser = createAsyncThunk(
  'deleteUser',
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
