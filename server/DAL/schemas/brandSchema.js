import mongoose from "mongoose";

export const BrandSchema = new mongoose.Schema({
  Ma: Number,
  Ten: String,
});