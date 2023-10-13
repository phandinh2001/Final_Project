import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  listDetailBill: [],
  listHashSet: [],
  detailBillItem: null,
};

export const detailBillOfSaleSlice = createSlice({
  name: "detailBillOfSale",
  initialState,
  reducers: {
    getAllDetailBillOfSale(state) {},
    getAllDetailBillOfSaleByHashSet(state) {},
    retrieveAllDetailBillOfSale(state, action: PayloadAction<any>) {
      state.listDetailBill = action.payload;
    },
    getDetailBillOfSaleByHashSetOfDate(state, action: PayloadAction<any>) {},
    retrieveDetailBillOfSaleHashSet(state, action: PayloadAction<any>) {
      state.listHashSet = action.payload;
    },
    removeListDetailBillInStore(state) {
      state.listDetailBill = [];
    },
    removeListHashSetOfDetailBillInStore(state) {
      state.listHashSet = [];
    },
    getDetailBillOfSaleByIdBill(state, action: PayloadAction<any>) {},
    retrieveDetailBillOfSaleByIdBill(state, action: PayloadAction<any>) {
      state.listDetailBill = action.payload;
    },
    getDetailBillOfSaleItem(state, action: PayloadAction<any>) {},
    retrieveDetailBillOfSaleItem(state, action: PayloadAction<any>) {
      state.detailBillItem = action.payload;
    },
  },
});

export const {
  getAllDetailBillOfSale,
  retrieveAllDetailBillOfSale,
  getDetailBillOfSaleByIdBill,
  retrieveDetailBillOfSaleByIdBill,
  getAllDetailBillOfSaleByHashSet,
  removeListDetailBillInStore,
  getDetailBillOfSaleByHashSetOfDate,
  retrieveDetailBillOfSaleHashSet,
  removeListHashSetOfDetailBillInStore,
} = detailBillOfSaleSlice.actions;

export default detailBillOfSaleSlice.reducer;
