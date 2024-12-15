import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  fetchAllCategoryLook,
} from '../../Action/Assets/category';

const initialState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
};

export const CategorySlice = createSlice({
  name: 'CategorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all category
    builder.addCase(fetchAllCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // fetch all category look
    builder.addCase(fetchAllCategoryLook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCategoryLook.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllCategoryLook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // create a new category
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count + 1;
      state.data.unshift(action.payload.data);
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // delete category
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.count = state.count - 1;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // update a  category
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i]._id === action.payload.data._id) {
          state.data[i].name = action.payload.data.name;
          state.data[i].updateAt = action.payload.data.updateAt;
          break;
        }
      }
      // state.data.map((data) => {
      //   if (data._id === action.payload.data._id) {
      //     data.name = action.payload.data.name;
      //     data.updateAt = action.payload.data.updateAt;
      //   }
      // });
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
