import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createClientSuccess,
  retrieveClientItem,
  retrieveClients,
  retrieveListHashSetClient,
} from "../slices/clientSlice";
import {
  createClient,
  deleteClientById,
  findClientByPhone,
  getAllClients,
  getClientItemById,
  getListClientAndTotalMoney,
  updateClient,
  updateInformationClient,
} from "../../services/client.service";
import { setMessage } from "../slices/messageSlice";
import { updateUser } from "../../services/user.service";
import { updateNameUser } from "../slices/userSlice";

export function* getAllClientSaga() {
  const res = yield call(getAllClients);
  yield put(retrieveClients(res.data.clients));
}

export function* createClientSaga(action: PayloadAction<any>) {
  try {
    const { name, phone, email, sex, birthday, address, handleBack } =
      action.payload;
    const res = yield call(
      createClient,
      phone,
      name,
      birthday,
      email,
      sex,
      address
    );
    if (res.data) {
      yield put(createClientSuccess(res.data));
      alert("Thêm mới thành công");
      handleBack();
    }
  } catch (e) {
    yield put(setMessage(e.response.data));
  }
}

export function* getListClientAndTotalMoneySaga(action: PayloadAction<any>) {
  try {
    const res = yield call(getListClientAndTotalMoney, action.payload);
    res.data.sort((a, b) => {
      if (a.total < b.total) return 1;
      if (a.total > b.total) return -1;
      return 0;
    });
    yield put(retrieveListHashSetClient(res.data));
  } catch (e) {}
}


export function* updateClientSaga(action: PayloadAction<any>) {
  try {
    const { id, name, email, sex, birthday, address, handleBack } =
      action.payload;
    yield;
    const res = yield call(
      updateClient,
      id,
      name,
      birthday,
      email,
      sex,
      address
    );
    if (res.data) {
      handleBack();
    }
  } catch (e) {
    console.log(e);
  }
}

export function* updateInformationClientSaga(action: PayloadAction<any>) {
  try {
    const { id, client } = action.payload;
    yield call(updateInformationClient, id, client);
    yield call(updateUser, client);
    yield put(updateNameUser(client.Ten));
    alert("cập nhật thành công");
    const user = JSON.parse(localStorage.getItem("user")!);
    user.username = client.Ten;
    JSON.parse(localStorage.setItem("user", JSON.stringify(user))!);
  } catch (e) {}
}

export function* deleteClientSaga(account: PayloadAction<string>) {
  try {
    const id = account.payload;
    yield call(deleteClientById, id);
  } catch (e) {}
}
export function* getClientItemSaga(action: PayloadAction<any>) {
  try {
    const id = action.payload;
    const res = yield call(getClientItemById, id);
    yield put(retrieveClientItem(res.data[0]));
  } catch (e) {}
}

export function* getClientItemByPhoneSaga(action: PayloadAction<any>) {
  try {
    const phone = action.payload;
    const res = yield call(findClientByPhone, phone);
    yield put(retrieveClientItem(res.data[0]));
  } catch (e) {}
}
