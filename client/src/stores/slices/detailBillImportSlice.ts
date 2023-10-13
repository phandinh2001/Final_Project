import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  listDetailBill: [],
  detailBillItem: null,
};

export const detailBillImportSlice = createSlice({
  name: "detailBillImport",
  initialState,
  reducers: {
    getAllDetailBillImport(state) {},
    getDetailBillImportByIdBill(state, action: PayloadAction<any>) {},
    retrieveAllDetailBillImport(state, action: PayloadAction<any>) {
      state.listDetailBill = action.payload;
    },
  },
});

export const {
  getAllDetailBillImport,
  getDetailBillImportByIdBill,
  retrieveAllDetailBillImport,
} = detailBillImportSlice.actions;

export default detailBillImportSlice.reducer;
