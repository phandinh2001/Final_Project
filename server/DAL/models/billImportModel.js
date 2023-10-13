import mongoose from "mongoose";
import { BillImportSchema } from "../schemas/billImportSchema";

const model = mongoose.model("hoadonnhaps", BillImportSchema);

export const getAllBillImport = () => {
  return model.find().sort({ Ngay: -1 }).exec();
};
// export const getBillOfSaleById = (id) => {
//   return model.findById(id).exec();
// };
// export const getBillOfSaleCancel = () => {
//   return model.find({ Huy: true }).exec();
// };
// export const getBillOfSaleNotCancel = () => {
//   return model.find({ Huy: false }).exec();
// };

// export const getBillOfSaleBought = () => {
//   return model.find({ Huy: false, TrangThai: 'Đã giao' }).exec();
// };
// export const getBillOfSaleBuying = () => {
//   return model.find({ Huy: false, TrangThai: { $in: ['Đang xử lý', 'Chờ giao hàng'] } }).exec();
// };
// export const getBillOfSaleByIdClient = (id) => {
//   return model.find({ MaKH: id }).sort({ Ngay: -1 }).exec();
// };
// export const getBillOfSaleOfClientOrderByIdClient = (id) => {
//   return model.find({ MaKH: id, NguoiLap: 'KhachHang' }).sort({ Ngay: -1 }).exec();
// };
export const getAllBillImportSortById = () => {
  return model.find().sort({ MaHD: -1 }).exec();
};
export const createBillImport = (bill) => {
  return model.create(bill);
};
export const updateBillImport = (id, bill) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      Ngay: bill.Ngay,
      TrangThai: bill.TrangThai,
      ThanhToan: bill.ThanhToan,
      Huy: bill.Huy,
      GhiChu: bill.GhiChu,
    },
  });
};
