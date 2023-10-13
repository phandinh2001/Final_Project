import mongoose from "mongoose";

export const DetailCategorySchema = new mongoose.Schema({
  Ma: Number,
  MaLoai: Number,
  Ten: String,
});