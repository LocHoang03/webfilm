import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_FETCH_ALL_COMMON_QUESTIONS,
  API_CREATE_COMMON_QUESTIONS,
  API_UPDATE_COMMON_QUESTIONS,
  API_DELETE_COMMON_QUESTIONS,
} from '../../../configs/apis';

export const fetchAllCommonQuestions = createAsyncThunk(
  'fetchAllCommonQuestions',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_FETCH_ALL_COMMON_QUESTIONS +
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

export const createCommonQuestions = createAsyncThunk(
  'createCommonQuestions',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_CREATE_COMMON_QUESTIONS, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);

export const updateCommonQuestions = createAsyncThunk(
  'updateCommonQuestions',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_UPDATE_COMMON_QUESTIONS + '/' + data.Id, {
      method: 'PATCH',
      body: JSON.stringify(data.dataBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);

export const deleteCommonQuestions = createAsyncThunk(
  'deleteCommonQuestions',
  async (data, { rejectWithValue }) => {
    const response = await fetch(API_DELETE_COMMON_QUESTIONS + '/' + data, {
      method: 'POST',
    });
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return data;
  },
);
