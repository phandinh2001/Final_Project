import mongoose from "mongoose";

export const BillImportSchema = new mongoose.Schema({
  MaHD: Number,
  MaNCC: Number,
  Ngay: Date,
  TrangThai: Number,
  ThanhToan: Boolean,
  TongTien: Number,
  Huy: Boolean,
  GhiChu: String,
});
