import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUser,
  fetchAllUser,
  resetPasswordUser,
  createUser,
  updateUser,
  fetchAllUserLook,
} from '../../Action/Manage/user';

const initialState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
};

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all users
    builder.addCase(fetchAllUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
      state.count = action.payload.count;
    });
    builder.addCase(fetchAllUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // fetch all users look
    builder.addCase(fetchAllUserLook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUserLook.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
      state.count = action.payload.count;
    });
    builder.addCase(fetchAllUserLook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // create a new user
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count + 1;
      state.data.unshift(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // update user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload.data);
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i]._id === action.payload.userId) {
          state.data[i].firstName = action.payload.data.firstName;
          state.data[i].lastName = action.payload.data.lastName;
          state.data[i].email = action.payload.data.email;
          state.data[i].phoneNumber = action.payload.data.phoneNumber;
          state.data[i].sex = action.payload.data.sex;
          state.data[i].role = action.payload.data.typeAccount;
          break;
        }
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // reset password user
    builder.addCase(resetPasswordUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPasswordUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.map((data) => {
        if (data._id === action.payload.userId) {
          data.password = action.payload.newPassword;
        }
      });
    });
    builder.addCase(resetPasswordUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
      state.count = state.count - 1;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
