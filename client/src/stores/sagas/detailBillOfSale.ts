import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getAllDetailBillByHashSet,
  getAllDetailBillByHashSetOfDate,
  getDetailBillOfSaleByIdBill,
} from "../../services/detailBillOfSale.service";
import {
  retrieveDetailBillOfSaleByIdBill,
  retrieveDetailBillOfSaleHashSet,
} from "../slices/detailBillOfSaleSlice";

export function* getDetailBillOfSaleByIdBillSaga(action: PayloadAction<any>) {
  const id = action.payload;
  try {
    const res = yield call(getDetailBillOfSaleByIdBill, id);
    yield put(retrieveDetailBillOfSaleByIdBill(res.data.detailBill));
  } catch (e) {}
}
export function* getAllDetailBillByHashSetSaga() {
  try {
    const res = yield call(getAllDetailBillByHashSet);
    res.data.sort((a, b) => {
      if (a.count < b.count) return 1;
      if (a.count > b.count) return -1;
      return 0;
    });
    yield put(retrieveDetailBillOfSaleHashSet(res.data));
  } catch (e) {}
}
export function* getDetailBillByHashSetOfDateSaga(action: PayloadAction<any>) {
  try {
    const res = yield call(getAllDetailBillByHashSetOfDate, action.payload);
    res.data.sort((a, b) => {
      if (a.count < b.count) return 1;
      if (a.count > b.count) return -1;
      return 0;
    });
    yield put(retrieveDetailBillOfSaleHashSet(res.data));
  } catch (e) {}
}
