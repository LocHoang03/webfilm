import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_FETCH_ALL_CUSTOMER_QUESTIONS,
  API_RESOLVE_CUSTOMER_QUESTIONS,
} from '../../../configs/apis';

export const fetchAllCustomerQuestions = createAsyncThunk(
  'fetchAllCustomerQuestions',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_FETCH_ALL_CUSTOMER_QUESTIONS +
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

export const resolveCustomerQuestions = createAsyncThunk(
  'resolveCustomerQuestions',
  async (dataBody, { rejectWithValue }) => {
    const response = await fetch(
      API_RESOLVE_CUSTOMER_QUESTIONS + '/' + dataBody.explainId,
      {
        method: 'POST',
        body: JSON.stringify(dataBody),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return dataBody.explainId;
  },
);
