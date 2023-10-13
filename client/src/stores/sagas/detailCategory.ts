import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createDetailCateSuccess,
  deleteDetailCateSuccess,
  retrieveDetailCategory,
  retrieveDetailCategoryItem,
} from "../slices/detailCategorySlice";
import {
  createDetailCategory,
  deleteDetailCategoryById,
  getAllDetailCategory,
  getDetailCategoryById,
  updateDetailCate,
} from "../../services/detailCategory.service";

export function* getAllDetailCategorySaga() {
  const res = yield call(getAllDetailCategory);
  yield put(retrieveDetailCategory(res.data.detailCategory));
}

export function* getDetailCategoryItemSaga(action: PayloadAction<number>) {
  const id = action.payload;
  const res = yield call(getDetailCategoryById, id);

  yield put(retrieveDetailCategoryItem(res.data[0]));
}

export function* createDetailCateSaga(action: PayloadAction<any>) {
  try {
    const { name, idCate } = action.payload;
    const res = yield call(createDetailCategory, name, idCate);
    if (res.data) yield put(createDetailCateSuccess(res.data));
  } catch (e) {}
}

export function* deleteDetailCateSaga(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    const res = yield call(deleteDetailCategoryById, id);
    if (res.data.delete === false)
      yield alert(
        "không thể xóa chi tiết loại sản phẩm khi nó đang được sử dụng "
      );
    if (res.data.delete === true)
      yield put(deleteDetailCateSuccess(res.data.detailCate._id));
  } catch (e) {}
}

export function* updateDetailCateSaga(action: PayloadAction<any>) {
  try {
    const { id, name, idCate } = action.payload;
    yield call(updateDetailCate, id, name, idCate);
  } catch (e) {}
}
