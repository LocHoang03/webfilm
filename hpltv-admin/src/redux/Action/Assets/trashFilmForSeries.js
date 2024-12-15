import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_SERIES, API_SERIES_ADMIN } from '../../../configs/apis';

export const fetchAllFilmForSeriesTrash = createAsyncThunk(
  'fetchAllFilmForSeriesTrash',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES +
        '/' +
        size.value +
        '/from-page?trash=true&limit=' +
        process.env.REACT_APP_SIZE_PAGE +
        '&page=' +
        size.pageNum,
    );
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const deleteTrashFilmForSeries = createAsyncThunk(
  'deleteTrashFilmForSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES_ADMIN + '/' + data.seriesId + '/delete-film/' + data.dataId,
      {
        method: 'POST',
        body: JSON.stringify({ type: data.type }),
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
    return data.dataId;
  },
);

export const postRecoverFilmForSeries = createAsyncThunk(
  'postRecoverFilmForSeries',
  async (Data, { rejectWithValue }) => {
    const response = await fetch(
      API_SERIES_ADMIN + '/' + Data.seriesId + '/recover-film',
      {
        method: 'POST',
        body: JSON.stringify(Data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return Data.dataId;
  },
);
