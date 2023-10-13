import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "../../services/brand.service";
import { createBrandSuccess, deleteBrandSuccess, retrieveBrandItem, retrieveBrands } from "../slices/brandSlice";

export function* getAllBrandSaga() {
  const res = yield call(getAllBrands);
  yield put(retrieveBrands(res.data.brands));
}

export function* getBrandItemSaga(action:PayloadAction<number>) {
  const id = action.payload
  const res = yield call(getBrandById,id);
  
  yield put(retrieveBrandItem(res.data[0]));
}

export function* createBrandSaga(action: PayloadAction<any>) {
  try {
    const newBrand = action.payload;
    const res = yield call(createBrand, newBrand);
    yield put(createBrandSuccess(res.data));
  } catch (e) {}
}
export function* updateBrandSaga(action: PayloadAction<any>) {
  try {
    const { id, brand } = action.payload;  
    yield call(updateBrand, id, brand);
  } catch (e) {}
}
export function* deleteBrandSaga(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    const res = yield call(deleteBrand, id);
    if (res.data.delete === true) yield put(deleteBrandSuccess(id));
    if (res.data.delete === false) yield alert("không thể xóa thương hiệu");
  } catch (e) {}
}