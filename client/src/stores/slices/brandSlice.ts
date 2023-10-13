import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  listBrand: [],
  brandItem: null,
};

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    getAllBrands(state) {},
    retrieveBrands(state, action: PayloadAction<any>) {
      state.listBrand = action.payload;
    },
    getBrandItem(state, action: PayloadAction<number>) {},
    retrieveBrandItem(state, action: PayloadAction<any>) {
      state.brandItem = action.payload;
    },
    createBrand(state, action: PayloadAction<any>) {},
    createBrandSuccess(state, action: PayloadAction<any>) {
      state.listBrand.push(action.payload);
    },
    updateBrand(state, action: PayloadAction<any>) {
      const { id, brand } = action.payload;
      state.listBrand = state.listBrand.map((sup) => {
        if (sup._id === id) {
          return {
            ...sup,
            Ten: brand.Ten,
          };
        }
        return sup;
      });
    },
    deleteBrand(state, action: PayloadAction<string>) {},
    deleteBrandSuccess(state, action: PayloadAction<string>) {
      state.listBrand = state.listBrand.filter(
        (bra) => bra._id !== action.payload
      );
    },
  },
});

export const {
  getAllBrands,
  retrieveBrands,
  getBrandItem,
  retrieveBrandItem,
  createBrand,
  createBrandSuccess,
  updateBrand,
  deleteBrand,
  deleteBrandSuccess,
} = brandSlice.actions;

export default brandSlice.reducer;
