import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCommonQuestions,
  createCommonQuestions,
  updateCommonQuestions,
  deleteCommonQuestions,
} from '../../Action/Setting/commonQuestion';

const initialState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
};

export const CommonQuestionsSlice = createSlice({
  name: 'CommonQuestionsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all common questions
    builder.addCase(fetchAllCommonQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCommonQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllCommonQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // create a new common questions
    builder.addCase(createCommonQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCommonQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count + 1;
      state.data.unshift(action.payload.data);
    });
    builder.addCase(createCommonQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // update a common questions
    builder.addCase(updateCommonQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCommonQuestions.fulfilled, (state, action) => {
      state.loading = false;
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i]._id === action.payload.data._id) {
          state.data[i].title = action.payload.data.title;
          state.data[i].description = action.payload.data.description;
          break;
        }
      }
    });
    builder.addCase(updateCommonQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // delete a common questions
    builder.addCase(deleteCommonQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCommonQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count - 1;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteCommonQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
