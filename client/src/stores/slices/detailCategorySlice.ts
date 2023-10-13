import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  listDetailCategory: [],
  detailCategoryItem: null,
};

export const detailCategorySlice = createSlice({
  name: "detailCategory",
  initialState,
  reducers: {
    getAllDetailCategory(state) {},
    retrieveDetailCategory(state, action: PayloadAction<any>) {
      state.listDetailCategory = action.payload;
    },
    getDetailCategoryItem(state, action: PayloadAction<number>) {},
    retrieveDetailCategoryItem(state, action: PayloadAction<any>) {
      state.detailCategoryItem = action.payload;
    },
    createDetailCate(state, action: PayloadAction<any>) {},
    createDetailCateSuccess(state, action: PayloadAction<any>) {
      state.listDetailCategory.push(action.payload);
    },
    deleteDetailCate(state, action: PayloadAction<string>) {},
    deleteDetailCateSuccess(state, action: PayloadAction<string>) {
      state.listDetailCategory = state.listDetailCategory.filter(
        (cate) => cate._id !== action.payload
      );
    },
    sortByIdCategoryAscending(state) {
      state.listDetailCategory.sort((a, b) => {
        if (a.MaLoai > b.MaLoai) return 1;
        if (a.MaLoai < b.MaLoai) return -1;
        return 0;
      });
    },
    sortByIdCategoryDecrease(state) {
      state.listDetailCategory.sort((a, b) => {
        if (a.MaLoai < b.MaLoai) return 1;
        if (a.MaLoai > b.MaLoai) return -1;
        return 0;
      });
    },
    updateDetailCategory(state, action: PayloadAction<any>) {
      state.listDetailCategory = state.listDetailCategory.map((detailCate) => {
        if (detailCate._id === action.payload.id) {
          return {
            ...detailCate,
            Ten: action.payload.name,
            MaLoai: Number(action.payload.idCate),
          };
        }
        return detailCate;
      });
    },
  },
});

export const {
  getAllDetailCategory,
  retrieveDetailCategory,
  getDetailCategoryItem,
  retrieveDetailCategoryItem,
  createDetailCate,
  createDetailCateSuccess,
  deleteDetailCate,
  deleteDetailCateSuccess,
  sortByIdCategoryAscending,
  sortByIdCategoryDecrease,
  updateDetailCategory,
} = detailCategorySlice.actions;

export default detailCategorySlice.reducer;
