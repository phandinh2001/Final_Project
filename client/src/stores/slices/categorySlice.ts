import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UpdateCategory } from "../types/category";

const initialState: any = {
  listCategory: [],
  categoryItem: null,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getAllCategories(state) {},
    retrieveCategories(state, action: PayloadAction<any>) {
      state.listCategory = action.payload;
    },
    getCategoryItem(state, action: PayloadAction<number>) {},
    retrieveCategoryItem(state, action: PayloadAction<any>) {
      state.categoryItem = action.payload;
    },
    deleteCategory(state, action: PayloadAction<string>) {},
    deleteCategorySuccess(state, action: PayloadAction<string>) {
      state.listCategory = state.listCategory.filter(
        (cate) => cate._id !== action.payload
      );
    },
    updateCategory(state, action: PayloadAction<UpdateCategory>) {
      state.listCategory = state.listCategory.map((cate) => {
        if (cate._id === action.payload.id) {
          return {
            ...cate,
            Ten: action.payload.name,
          };
        }
        return cate;
      });
    },
    createCategory(state, action: PayloadAction<string>) {},
    createCategorySuccess(state, action: PayloadAction<any>) {
      state.listCategory.push(action.payload);
    },
  },
});

export const {
  getAllCategories,
  retrieveCategories,
  getCategoryItem,
  retrieveCategoryItem,
  deleteCategory,
  deleteCategorySuccess,
  updateCategory,
  createCategory,
  createCategorySuccess,
} = categorySlice.actions;

export default categorySlice.reducer;
