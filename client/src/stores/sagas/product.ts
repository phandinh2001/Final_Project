import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getAllProductByIdOfDetailCate,
  getInventoryAndSold,
  getProductById,
  getProductsByIdOfSupplier,
  searchProductByName,
  searchProductByNameAndIdCate,
  updateColorAndSize,
  updateProductById,
} from "../../services/product.service";
import {
  createProductSuccess,
  deleteProduct,
  retrieveProductItem,
  retrieveProducts,
} from "../slices/productSlice";
import { deleteDetailPro } from "../../services/detailPro";

export function* getAllProductSaga() {
  try {
    const res = yield call(getAllProduct);
    yield put(retrieveProducts(res.data.products));
  } catch (e) {
    console.log(e);
  }
}
export function* getProductsByIdOfSupplierSaga(action: PayloadAction<any>) {
  const { id } = action.payload;
  try {
    const res = yield call(getProductsByIdOfSupplier, id);
    yield put(retrieveProducts(res.data.products));
  } catch (e) {
    console.log(e);
  }
}

export function* getAllProductOfDetailCateSaga(action: PayloadAction<any>) {
  const id = action.payload;
  try {
    const res = yield call(getAllProductByIdOfDetailCate, id);
    yield put(retrieveProducts(res.data));
  } catch (e) {
    console.log(e);
  }
}
export function* getProductByIdSaga(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    const res = yield call(getProductById, id);

    if (res.data) yield put(retrieveProductItem(res.data));
  } catch (e) {
    console.log(e);
  }
}

export function* getInventoryAndSoldSaga() {
  try {
    const res = yield call(getInventoryAndSold);

    if (res.data) yield put(retrieveProducts(res.data));
  } catch (e) {
    console.log(e);
  }
}

export function* searchProductSaga(action: PayloadAction<any>) {
  try {
    const { name, idCate } = action.payload;
    if (idCate) {
      const res = yield call(searchProductByNameAndIdCate, name, idCate);
      yield put(retrieveProducts(res.data));
    } else {
      const res = yield call(searchProductByName, name);
      yield put(retrieveProducts(res.data));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* deleteProductSaga(action: PayloadAction<string>) {
  const id = action.payload;
  try {
    const res = yield call(deleteProductById, id);
    if (res.data) {
      yield call(deleteDetailPro, res.data.Ma);
      yield put(deleteProduct(id));
    }
  } catch (e) {
    // console.log(e);
  }
}
export function* createProductSaga(action: PayloadAction<any>) {
  const product = action.payload.product;
  const navigate = action.payload.navigate;
  try {
    const res = yield call(createProduct, product);
    if (res.data) {
      yield put(createProductSuccess(res.data));
      navigate(res.data.Ma);
    }
  } catch (e) {
    // console.log(e);
  }
}

export function* updateProductSaga(action: PayloadAction<any>) {
  const product = action.payload.product;
  const navigate = action.payload.navigate;
  try {
    const res = yield call(updateProductById, product);
    if (res.data) {
      yield call(updateColorAndSize, res.data.Ma, product.KichThuoc_Mau);
      navigate(res.data.Ma);
    }
  } catch (e) {
    // console.log(e);
  }
}
