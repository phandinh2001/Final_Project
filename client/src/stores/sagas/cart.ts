import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createCartItem,
  deleteCartItem,
  deleteManyCartByIdClient,
  getCartByIdClient,
  updateCartById,
} from "../../services/cart.service";
import { createCartItemSuccess, retrieveCart } from "../slices/cartSlice";

export function* getCartByIdClientSaga(action: PayloadAction<any>) {
  try {
    const id = action.payload;
    const res = yield call(getCartByIdClient, id);
    if (res.data.count > 0) yield put(retrieveCart(res.data.cart));
  } catch (e) {}
}

export function* updateCartSaga(action: PayloadAction<any>) {
  try {
    const { id, cart } = action.payload;
    yield call(updateCartById, id, cart);
  } catch (e) {}
}

export function* deleteCartItemSaga(action: PayloadAction<any>) {
  try {
    const id = action.payload;
    yield call(deleteCartItem, id);
  } catch (e) {}
}

export function* deleteManyCartByIdClientSaga(action: PayloadAction<any>) {
  try {
    const id = action.payload;
    yield call(deleteManyCartByIdClient, id);
  } catch (e) {}
}

export function* createCartItemSaga(action: PayloadAction<any>) {
  try {
    const { cartItem, navigate } = action.payload;
    const res = yield call(createCartItem, cartItem);
    if (Object.keys(res.data).length > 0) {
      yield call(navigate);
      yield put(createCartItemSuccess(res.data));
    }
  } catch (e) {}
}
