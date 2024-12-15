import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_DATA_PACKAGE,
  API_GET_ADMIN_PACKAGE,
} from '../../../configs/apis';

export const fetchAllPackage = createAsyncThunk(
  'fetchAllPackage',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_DATA_PACKAGE +
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

export const fetchAllPackageLook = createAsyncThunk(
  'fetchAllPackageLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_DATA_PACKAGE +
        '/fetch-look?trash=false' +
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

export const updatePackage = createAsyncThunk(
  'updatePackage',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_GET_ADMIN_PACKAGE + '/update-package' + '/' + data.Id,
      {
        method: 'POST',
        body: JSON.stringify(data.dataBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);
