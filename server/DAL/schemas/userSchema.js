import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  SDT: String,
  MatKhau: String,
  Ten: String,
  NgaySinh: Date,
  Anh: String,
  PhanQuyen: String ,
  KhoaTK:Boolean
});