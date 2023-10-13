import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  listBill: [],
  billItem: null,
};

export const billImportSlice = createSlice({
  name: "billImport",
  initialState,
  reducers: {
    getAllBillImport(state) {},
    retrieveAllBillImport(state, action: PayloadAction<any>) {
      state.listBill = action.payload;
    },
    updatePayBillImport(state, action: PayloadAction<any>) {
      const { id, bill } = action.payload;
      state.listBill = state.listBill.map((b) => {
        if (b._id === id) {
          return {
            ...b,
            ThanhToan: bill.ThanhToan,
          };
        }
        return b;
      });
    },
    updateStatusBillImport(state, action: PayloadAction<any>) {
      const { id, bill } = action.payload;
      state.listBill = state.listBill.map((b) => {
        if (b._id === id) {
          return {
            ...b,
            TrangThai: bill.TrangThai,
          };
        }
        return b;
      });
    },
    cancelBillImport(state, action: PayloadAction<any>) {
      const { id, bill } = action.payload;
      state.listBill = state.listBill.map((b) => {
        if (b._id === id) {
          return {
            ...b,
            TrangThai: bill.TrangThai,
            Huy: bill.Huy,
          };
        }
        return b;
      });
    },
    createBillImport(state, action: PayloadAction<any>) {},
    createBillImportSuccess(state, action: PayloadAction<any>) {
      state.listBill.unshift(action.payload);
    },
  },
});

export const {
  getAllBillImport,
  retrieveAllBillImport,
  updatePayBillImport,
  updateStatusBillImport,
  cancelBillImport,
  createBillImport,
  createBillImportSuccess,
} = billImportSlice.actions;

export default billImportSlice.reducer;
