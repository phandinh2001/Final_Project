import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
  Ma: Number,
  Ten: String,
  GiaNhap: Number,
  GiaBan: Number,
  SoLuong: Number,
  MaLoai: Number,
  MoTa: String,
  Anh: Array,
  MaThuongHieu: Number,
  GioiTinh: String,
  MaNCC: Number,
  KhuyenMai: Number,
  KichThuoc_Mau: Object,
});
