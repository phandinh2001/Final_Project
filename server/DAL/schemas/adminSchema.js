import mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema({
  Ma: Number,
  Ten: String,
  SDT: String,
  NgaySinh: Date,
  DiaChi: String,
  GioiTinh: String,
  Email: String,
});
