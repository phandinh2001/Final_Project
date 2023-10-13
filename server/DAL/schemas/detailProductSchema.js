import mongoose from "mongoose";

export const DetailProductSchema = new mongoose.Schema({
  MaSP: Number,
  ChiTiet: String,
});