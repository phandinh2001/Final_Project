import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllDetailPro, getDetailProById } from "../../services/detailPro";
import {
  retrieveDetailPro,
  retrieveDetailProItem,
} from "../slices/detailProSlice";

export function* getAllDetailProSaga() {
  try {
    const res = yield call(getAllDetailPro);
    yield put(retrieveDetailPro(res.data.detailProduct));
  } catch (e) {}
}

export function* getDetailProItemSaga(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const res = yield call(getDetailProById, id);
    yield put(retrieveDetailProItem(res.data[0]));
  } catch (e) {}
}
