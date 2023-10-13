import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { findAdminByPhone, updateAdmin } from "../../services/admin.service";
import { retrieveAdminItemByPhone } from "../slices/adminSlice";
import { updateNameUser } from "../slices/userSlice";
import { updateUser } from "../../services/user.service";

export function* getAdminByPhoneSaga(action: PayloadAction<any>) {
  const phone = action.payload;
  try {
    const res = yield call(findAdminByPhone, phone);
    yield put(retrieveAdminItemByPhone(res.data[0]));
  } catch (e) {}
}

// export function* createClientSaga(action: PayloadAction<any>) {
//   try {
//     const { name, phone, email, sex, birthday, address, handleBack } =
//       action.payload;
//     const res = yield call(
//       createClient,
//       phone,
//       name,
//       birthday,
//       email,
//       sex,
//       address
//     );
//     if (res.data) {
//       yield put(createClientSuccess(res.data));
//       alert("Thêm mới thành công");
//       handleBack();
//     }
//   } catch (e) {}
// }
export function* updateAdminSaga(action: PayloadAction<any>) {
  try {
    const { id, admin } = action.payload;
    yield call(updateAdmin, id, admin);
    yield call(updateUser, admin);
    yield put(updateNameUser(admin.Ten));
    alert("cập nhật thành công");
    const user = JSON.parse(localStorage.getItem("user")!);
    user.username = admin.Ten;
    JSON.parse(localStorage.setItem("user", JSON.stringify(user))!);
  } catch (e) {}
}

// export function* deleteClientSaga(account: PayloadAction<string>) {
//   try {
//     const id = account.payload;
//     yield call(deleteClientById, id);
//   } catch (e) {}
// }
// export function* getClientItemSaga(action: PayloadAction<number>) {
//   try {
//     const id = action.payload;
//     const res = yield call(getClientItemById, id);
//     yield put(retrieveClientItem(res.data[0]));
//   } catch (e) {}
// }
