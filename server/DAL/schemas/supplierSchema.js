import mongoose from 'mongoose';

export const SupplierSchema = new mongoose.Schema({
  Ma: Number,
  Ten: String,
  DiaChi: String,
  SDT: String,
});
