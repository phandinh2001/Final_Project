import {
  call,
  put,
} from 'redux-saga/effects';

import type { PayloadAction } from '@reduxjs/toolkit';

import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from '../../services/supplier.service';
import {
  createSupplierSuccess,
  deleteSupplierSuccess,
  retrieveSupplierItem,
  retrieveSuppliers,
} from '../slices/supplierSlice';

export function* getAllSupplierSaga() {
  const res = yield call(getAllSuppliers);
  yield put(retrieveSuppliers(res.data.suppliers));
}

export function* getSupplierItemSaga(action: PayloadAction<number>) {
  const id = action.payload;
  const res = yield call(getSupplierById, id);

  yield put(retrieveSupplierItem(res.data[0]));
}
export function* createSupplierSaga(action: PayloadAction<any>) {
  try {
    const newSupplier = action.payload;
    const res = yield call(createSupplier, newSupplier);
    yield put(createSupplierSuccess(res.data));
  } catch (e) {}
}

export function* deleteSupplierSaga(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    const res = yield call(deleteSupplier, id);
    if (res.data.delete === true) yield put(deleteSupplierSuccess(id));
    if (res.data.delete === false) yield alert("không thể xóa nhà cung cấp");
  } catch (e) {}
}
export function* updateSupplierSaga(action: PayloadAction<any>) {
  try {
    const { id, supplier } = action.payload;  
    yield call(updateSupplier, id, supplier);
  } catch (e) {}
}
