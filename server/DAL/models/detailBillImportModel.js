import mongoose from "mongoose";
import { DetailBillImportSchema } from "../schemas/detailBillImportSchema";

const model = mongoose.model("chitiethdnhaps", DetailBillImportSchema);

export const getAllDetailBillImport = () => {
  return model.find().exec();
};

export const getDetailBillImportByIdBill = (id) => {
  return model.find({ MaHD: id }).exec();
};

export const createDetailBillImport = (detailBill) => {
  return model.create(detailBill);
};
