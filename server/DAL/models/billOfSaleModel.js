import mongoose from "mongoose";
import { BillOfSaleSchema } from "../schemas/billOfSaleSchema";

const model = mongoose.model("hoadonbans", BillOfSaleSchema);

export const getAllBillOfSale = () => {
  return model.find().sort({ Ngay: -1 }).exec();
};
export const getBillOfSaleById = (id) => {
  return model.findById(id).exec();
};
export const getBillOfSaleCancel = () => {
  return model.find({ Huy: true }).exec();
};
export const getBillOfSaleNotCancel = () => {
  return model.find({ Huy: false }).exec();
};

export const getBillOfSaleBought = () => {
  return model.find({ Huy: false, TrangThai: 'Đã giao' }).exec();
};
export const getBillOfSaleBuying = () => {
  return model.find({ Huy: false, TrangThai: { $in: ['Đang xử lý', 'Chờ giao hàng'] } }).exec();
};
export const getBillOfSaleByIdClient = (id) => {
  return model.find({ MaKH: id }).sort({ Ngay: -1 }).exec();
};
export const getBillOfSaleOfClientOrderByIdClient = (id) => {
  return model.find({ MaKH: id, NguoiLap: 'KhachHang' }).sort({ Ngay: -1 }).exec();
};
export const getAllBillOfSaleSortById = () => {
  return model.find().sort({ MaHD: -1 }).exec();
};
export const createBillOfSale = (bill) => {
  return model.create(bill);
};
export const updateBillOfSale = (id, bill) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      Ngay: bill.Ngay,
      PhuongThucTT: bill.PhuongThucTT,
      SDTNhan: bill.SDTNhan,
      TenNguoiNhan: bill.TenNguoiNhan,
      TrangThai: bill.TrangThai,
      ThanhToan: bill.ThanhToan,
      Huy: bill.Huy,
      DiaChi: bill.DiaChi,
      GhiChu: bill.GhiChu,
    },
  });
};
