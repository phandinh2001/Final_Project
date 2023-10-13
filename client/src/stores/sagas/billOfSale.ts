import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createBillOfSale,
  getAllBillOfSale,
  getBillBoughtOfYear,
  getBillBuyingOfYear,
  getBillCancelOfYear,
  getBillOfSaleById,
  getBillOfSaleByIdClient,
  getBillOfSaleOfClientOrderByIdClient,
  updateBillOfSale,
} from "../../services/billOfSale.service";
import {
  createBillOfSaleSuccess,
  retrieveAllBillOfSale,
  retrieveBillOfSaleItem,
  retrieveDataChartOfBillOfSale,
} from "../slices/billOfSaleSlice";
import {
  createDetailBillOfSale,
  getDetailBillOfSaleByIdBill,
} from "../../services/detailBillOfSale.service";
import {
  getProductByIdNumber,
  updateQuantity,
  updateQuantityOfSizeAndColor,
} from "../../services/product.service";

export function* getAllBillOfSaleSaga() {
  const res = yield call(getAllBillOfSale);
  yield put(retrieveAllBillOfSale(res.data.bill));
}

export function* getBillOfSaleItemSaga(action: PayloadAction<string>) {
  const id = action.payload;
  const res = yield call(getBillOfSaleById, id);

  yield put(retrieveBillOfSaleItem(res.data[0]));
}

export function* getBillOfSaleByIdClientSaga(action: PayloadAction<any>) {
  try {
    const id = action.payload;
    const res = yield call(getBillOfSaleByIdClient, id);
    yield put(retrieveAllBillOfSale(res.data));
  } catch (e) {}
}

export function* getBillOfSaleOfClientOrderByIdClientSaga(
  action: PayloadAction<any>
) {
  try {
    const id = action.payload;
    const res = yield call(getBillOfSaleOfClientOrderByIdClient, id);
    yield put(retrieveAllBillOfSale(res.data));
  } catch (e) {}
}

export function* getDataChartBillOfSaleSaga(action: PayloadAction<any>) {
  try {
    const bought = yield call(getBillBoughtOfYear, action.payload);
    const buying = yield call(getBillBuyingOfYear, action.payload);
    const cancel = yield call(getBillCancelOfYear, action.payload);
    const arr: any[] = [];
    const LENGTH =
      Number(new Date().getFullYear()) === Number(action.payload)
        ? Number(new Date().getMonth()) + 2
        : 13;

    for (let i = 1; i < LENGTH; i++) {
      arr.push({
        name: `${i}/${action.payload}`,
        "Đang thực hiện": buying.data[i],
        "Hoàn thành": bought.data[i],
        Hủy: cancel.data[i],
      });
    }
    yield put(retrieveDataChartOfBillOfSale(arr));
  } catch (e) {}
}

export function* cancelBillOfSaleSaga(action: PayloadAction<any>) {
  try {
    const { id, bill } = action.payload;
    const res = yield call(updateBillOfSale, id, bill);
    const resDetail = yield call(getDetailBillOfSaleByIdBill, res.data.MaHD);
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
            if (q.id === arr[0].id) listQuantity[i].quantity += Number(bill.SoLuong);
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
export function* updateStatusBillOfSaleSaga(action: PayloadAction<any>) {
  try {
    const { id, bill } = action.payload;
    yield call(updateBillOfSale, id, bill);
  } catch (e) {}
}

export function* updatePayBillOfSaleSaga(action: PayloadAction<any>) {
  try {
    const { id, bill } = action.payload;
    yield call(updateBillOfSale, id, bill);
  } catch (e) {}
}

export function* createBillOfSaleSaga(action: PayloadAction<any>) {
  const { bill, listProduct, navigate } = action.payload;
  try {
    const res = yield call(createBillOfSale, bill);
    if (Object.keys(res.data).length > 0) {
      yield put(createBillOfSaleSuccess(res.data));
      let listQuantityBuy: any[] = [];
      yield listProduct.forEach(async (pro) => {
        const totalItem =
          (pro.product.GiaBan * (100 - pro.product.KhuyenMai)) / 100;
        const resDetail = await createDetailBillOfSale({
          MaHD: res.data.MaHD,
          MaSP: pro.product.Ma,
          DonGia: totalItem,
          SoLuong: pro.quantity,
          ThanhTien: totalItem * pro.quantity,
          KichThuoc: pro.size,
          Mau: pro.color,
        });
        const maxQuantity =
          resDetail.data[0].KichThuoc_Mau[pro.color][pro.size];
        let q = maxQuantity - pro.quantity;
        q = q > 0 ? q : 0;
        await updateQuantityOfSizeAndColor(
          resDetail.data[0].Ma,
          pro.color,
          pro.size,
          q
        );
        if (listQuantityBuy.length < 1)
          listQuantityBuy.push({
            id: resDetail.data[0]._id,
            quantity: resDetail.data[0].SoLuong - pro.quantity,
          });
        else {
          const arr = listQuantityBuy.filter(
            (q) => q.id === resDetail.data[0]._id
          );
          if (arr.length > 0) {
            listQuantityBuy.forEach((q, i) => {
              if (q.id === arr[0].id)
                listQuantityBuy[i].quantity -= pro.quantity;
            });
          } else {
            listQuantityBuy.push({
              id: resDetail.data[0]._id,
              quantity: resDetail.data[0].SoLuong - pro.quantity,
            });
          }
        }
        listQuantityBuy.forEach(async (item) => {
          await updateQuantity(item.id, item.quantity);
        });
      });

      // yield listQuantityBuy.forEach(async (item) => {
      //   console.log(item);
      //   await updateQuantity(item.id, item.quantity);
      // });

      navigate();
    }
  } catch (e) {
    // console.log(e);
  }
}
