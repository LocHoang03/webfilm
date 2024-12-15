import { createSlice } from '@reduxjs/toolkit';
import {
  deleteSubscriber,
  fetchAllSubscriber,
  resetPasswordSubscriber,
  postBannedSubscriber,
  fetchAllSubscriberLook,
} from '../../Action/Manage/subscriber';

const initialState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
};

export const SubscriberSlice = createSlice({
  name: 'SubscriberSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all subscriber
    builder.addCase(fetchAllSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSubscriber.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
      state.count = action.payload.count;
    });
    builder.addCase(fetchAllSubscriberLook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // fetch all subscriber look
    builder.addCase(fetchAllSubscriberLook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSubscriberLook.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
      state.count = action.payload.count;
    });
    builder.addCase(fetchAllSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // reset password subscriber
    builder.addCase(resetPasswordSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPasswordSubscriber.fulfilled, (state, action) => {
      state.loading = false;
      state.data.map((data) => {
        if (data._id === action.payload.userId) {
          data.password = action.payload.newPassword;
        }
      });
    });
    builder.addCase(resetPasswordSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // delete subscriber
    builder.addCase(deleteSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSubscriber.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // banned subscriber
    builder.addCase(postBannedSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postBannedSubscriber.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(postBannedSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
