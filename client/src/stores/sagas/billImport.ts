import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createBillImport,
  getAllBillImport,
  updateBillImport,
} from "../../services/billImport.service";
import { createBillImportSuccess, retrieveAllBillImport } from "../slices/billImportSlice";
import { createDetailBillImport, getDetailBillImportByIdBill } from "../../services/detailBillImport.service";
import {
  getProductByIdNumber,
  updateQuantity,
  updateQuantityOfSizeAndColor,
} from "../../services/product.service";

export function* getAllBillImportSaga() {
  const res = yield call(getAllBillImport);
  yield put(retrieveAllBillImport(res.data.bill));
}
export function* updatePayBillImportSaga(action: PayloadAction<any>) {
  try {
    const { id, bill } = action.payload;
    yield call(updateBillImport, id, bill);
  } catch (e) {}
}
export function* updateStatusBillImportSaga(action: PayloadAction<any>) {
  try {
    const { id, bill } = action.payload;
    const res = yield call(updateBillImport, id, bill);
    const resDetail = yield call(getDetailBillImportByIdBill, res.data.MaHD);
    const listBill = resDetail.data.detailBill;
    let listQuantity: any[] = [];
    yield listBill.forEach(async (bill) => {
      const pro = await getProductByIdNumber(bill.MaSP);
      const count = pro.data[0].KichThuoc_Mau[bill.Mau][bill.KichThuoc];
      await updateQuantityOfSizeAndColor(
        bill.MaSP,
        bill.Mau,
        bill.KichThuoc,
        count + Number(bill.SoLuong)
      );

      if (listQuantity.length < 1)
        listQuantity.push({
          id: pro.data[0]._id,
          quantity: pro.data[0].SoLuong + Number(bill.SoLuong),
        });
      else {
        const arr = listQuantity.filter((q) => q.id === pro.data[0]._id);
        if (arr.length > 0) {
          listQuantity.forEach((q, i) => {
            if (q.id === arr[0].id)
              listQuantity[i].quantity += Number(bill.SoLuong);
          });
        } else {
          listQuantity.push({
            id: pro.data[0]._id,
            quantity: pro.data[0].SoLuong + Number(bill.SoLuong),
          });
        }
      }
      listQuantity.forEach(async (item) => {
        await updateQuantity(item.id, item.quantity);
      });
    });
  } catch (e) {}
}

export function* cancelBillImportSaga(action: PayloadAction<any>) {
  try {
    const { id, bill } = action.payload;
    yield call(updateBillImport, id, bill);
  } catch (e) {}
}

export function* createBillImportSaga(action: PayloadAction<any>) {
  const { bill, listProduct, navigate } = action.payload;
  try {
    const res = yield call(createBillImport, bill);
    yield put(createBillImportSuccess(res.data));
    yield listProduct.forEach(async (pro) => {
      await createDetailBillImport({
        MaHD: res.data.MaHD,
        MaSP: pro.product.Ma,
        DonGia: pro.product.GiaNhap,
        SoLuong: pro.quantity,
        ThanhTien: pro.product.GiaNhap * pro.quantity,
        KichThuoc: pro.size,
        Mau: pro.color,
      });
    });
    navigate();
  } catch (e) {
    // console.log(e);
  }
}
