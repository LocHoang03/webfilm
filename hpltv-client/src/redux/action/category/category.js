import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_CATEGORY } from '../../../configs/apis';

export const fetchAllCategory = createAsyncThunk(
  'fetchAllCategory',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_CATEGORY);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);
