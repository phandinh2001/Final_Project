import mongoose from "mongoose";

export const ClientSchema = new mongoose.Schema({
  Ma: Number,
  Ten: String,
  SDT: String,
  NgaySinh: Date,
  DiaChi: String,
  GioiTinh: String,
  Email: String,
});
