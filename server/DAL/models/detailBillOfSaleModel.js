import mongoose from "mongoose";
import { DetailBillOfSaleSchema } from "../schemas/detailBillOfSaleSchema";

const model = mongoose.model("chitiethdbans", DetailBillOfSaleSchema);

export const getAllDetailBillOfSale = () => {
  return model.find().exec();
};

export const getDetailBillOfSaleByIdBill = (id) => {
  return model.find({ MaHD: id }).exec();
};

export const createDetailBillOfSale = (detailBill) => {
  return model.create(detailBill);
};
