import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "../../services/category.service";
import {
  createCategorySuccess,
  deleteCategorySuccess,
  retrieveCategories,
  retrieveCategoryItem,
} from "../slices/categorySlice";
import { UpdateCategory } from "../types/category";

export function* getAllCategoriesSaga() {
  try {
    const res = yield call(getAllCategories);
    yield put(retrieveCategories(res.data.categories));
  } catch (e) {}
}

export function* getCategoryItemSaga(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const res = yield call(getCategoryById, id);

    yield put(retrieveCategoryItem(res.data[0]));
  } catch (e) {}
}

export function* deleteCategorySaga(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    const res = yield call(deleteCategoryById, id);
    if (res.data.delete === true)
      yield put(deleteCategorySuccess(res.data.category._id));
    if (res.data.delete === false)
      yield alert(
        "không thể xóa loại sản phẩm khi nó đang được sử dụng "
      );
  } catch (e) {}
}

export function* updateCategorySaga(action: PayloadAction<UpdateCategory>) {
  try {
    const { id, name } = action.payload;
    yield call(updateCategoryById, id, name);
  } catch (e) {}
}

export function* createCategorySaga(action: PayloadAction<string>) {
  try {
    const name = action.payload;
    const res = yield call(createCategory, name);
    if (res.data) yield put(createCategorySuccess(res.data));
  } catch (e) {}
}
