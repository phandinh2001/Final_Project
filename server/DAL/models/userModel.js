import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserSchema } from "../schemas/userSchema";

const model = mongoose.model("taikhoans", UserSchema);

export const getAllUser = () => {
  return model.find().exec();
};

export const getMe = (phone) => {
  return model.find({ SDT: phone }).limit(1).exec();
};

export const signIn = (phone, pass) => {
  return model.find({ SDT: phone, MatKhau: pass }).limit(1).exec();
};

export const signUp = (newUser) => {
  return model.create(newUser);
};

export const updateAccount = (id, account) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      Ten: account.Ten,
      Anh: account.Anh,
      NgaySinh: account.NgaySinh,
      PhanQuyen: account.PhanQuyen,
      KhoaTK: account.KhoaTK,
      MatKhau: account.MatKhau,
    },
  });
};

export const generateAccessToken = (phone) => {
  return jwt.sign({ phone: phone }, "bWluZHgud2ViNjE=", {
    expiresIn: "15h",
  });
};
