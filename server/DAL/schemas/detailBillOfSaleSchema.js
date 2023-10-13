import mongoose from "mongoose";

export const DetailBillOfSaleSchema = new mongoose.Schema({
  DonGia: Number,
  MaHD: Number,
  MaSP: Number,
  SoLuong: Number,
  ThanhTien: Number,
  KichThuoc: String,
  Mau: String,
});
