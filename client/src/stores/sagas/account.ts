import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllAccounts, updateAccounts } from "../../services/account.service";
import { createAccountSuccess, retrieveAccounts } from "../slices/accountSlice";
import { register } from "../../services/user.service";
import {
  createClient,
  findClientByPhone,
  updateClient,
} from "../../services/client.service";
import { createAdmin } from "../../services/admin.service";

export function* getAllAccountSaga() {
  try {
    const res = yield call(getAllAccounts);
    yield put(retrieveAccounts(res.data.users));
  } catch (e) {}
}

export function* updateAccountSaga(action: PayloadAction<any>) {
  try {
    const { id, isClose } = action.payload;
    yield call(updateAccounts, id, { KhoaTK: isClose });
  } catch (e) {}
}

export function* createAccountSaga(action: PayloadAction<any>) {
  try {
    const { phone, password, name, birthday, isAdmin, avatar, handleBack } =
      action.payload;
    const res = yield call(
      register,
      phone,
      password,
      name,
      birthday,
      isAdmin,
      avatar
    );
    if (res.data.success) {
      yield put(createAccountSuccess(res.data.user));
      alert("Đăng ký thành công");
      yield call(handleBack);
      if (isAdmin === false) {
        try {
          const resClient = yield call(findClientByPhone, phone);
          if (resClient.data.length > 0) {
            yield call(
              updateClient,
              resClient.data[0]._id,
              name,
              birthday,
              "",
              "",
              ""
            );
          }
        } catch (e) {
          if (e.response.status === 404) {
            yield call(createClient, phone, name, birthday);
          }
        }
      } else {
        yield call(createAdmin, phone, name, birthday);
      }
    }
  } catch (e) {}
}
// export function* getAccountItemSaga(action:PayloadAction<number>) {
//   const id = action.payload
//   const res = yield call(getBrandById,id);

//   yield put(retrieveBrandItem(res.data[0]));
// }
