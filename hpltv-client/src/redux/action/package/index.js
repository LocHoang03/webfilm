import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_GET_ALL_PACKAGE } from '../../../configs/apis';

export const fetchAllPackage = createAsyncThunk(
  'fetchAllPackage',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_GET_ALL_PACKAGE, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
      },
    });
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);
