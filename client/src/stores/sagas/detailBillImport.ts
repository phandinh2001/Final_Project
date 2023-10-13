import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDetailBillImportByIdBill } from "../../services/detailBillImport.service";
import { retrieveAllDetailBillImport } from "../slices/detailBillImportSlice";

export function* getDetailBillImportByIdBillSaga(action: PayloadAction<any>) {
  const id = action.payload;
  try {
    const res = yield call(getDetailBillImportByIdBill, id);
    yield put(retrieveAllDetailBillImport(res.data.detailBill));
  } catch (e) {}
}

