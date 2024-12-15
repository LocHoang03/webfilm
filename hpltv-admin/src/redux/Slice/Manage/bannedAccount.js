import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllSubscriberBanned,
  fetchAllSubscriberBannedLook,
  postRecoverSubscriber,
} from '../../Action/Manage/bannedAccount';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const SubscriberBannedSlice = createSlice({
  name: 'SubscriberBannedSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all subscriber banned
    builder.addCase(fetchAllSubscriberBanned.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSubscriberBanned.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
      state.count = action.payload.count;
    });
    builder.addCase(fetchAllSubscriberBanned.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // fetch all subscriber banned look
    builder.addCase(fetchAllSubscriberBannedLook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSubscriberBannedLook.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
      state.count = action.payload.count;
    });
    builder.addCase(fetchAllSubscriberBannedLook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // recover subscriber
    builder.addCase(postRecoverSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postRecoverSubscriber.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(postRecoverSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
