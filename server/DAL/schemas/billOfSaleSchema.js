import mongoose from "mongoose";

export const BillOfSaleSchema = new mongoose.Schema({
  MaHD: Number,
  MaKH: Number,
  Ngay: Date,
  PhuongThucTT: String,
  SDTNhan: String,
  TenNguoiNhan: String,
  TrangThai: String,
  ThanhToan: Boolean,
  TongTien: Number,
  Huy: Boolean,
  DiaChi: String,
  GhiChu: String,
  NguoiLap: String,
});
