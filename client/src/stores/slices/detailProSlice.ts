import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  listDetailPro: [],
  detailProItem: null,
};

export const detailProSlice = createSlice({
  name: "detailPro",
  initialState,
  reducers: {
    getAllDetailPro(state) {},
    retrieveDetailPro(state, action: PayloadAction<any>) {
      state.listDetailPro = action.payload;
    },
    getDetailProItem(state, action: PayloadAction<number>) {},
    retrieveDetailProItem(state, action: PayloadAction<any>) {
      state.detailProItem = action.payload;
    },
  },
});

export const {
  getAllDetailPro,
  retrieveDetailPro,
  getDetailProItem,
  retrieveDetailProItem,
} = detailProSlice.actions;

export default detailProSlice.reducer;
