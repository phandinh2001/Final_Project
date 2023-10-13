import mongoose from "mongoose";

export const CartSchema = new mongoose.Schema({
    MaSP: Number,
    Mau: String,
    KichThuoc: String,
    SoLuong: Number,
    DonGia: Number,
    MaKH: Number,
});