import mongoose from "mongoose";
import { DetailProductSchema } from "../schemas/detailProductSchema";

const model = mongoose.model("chitietsps", DetailProductSchema);

export const getAllDetailPro = () => {
  return model.find().exec();
};

export const getDetailProById = (id) => {
  return model.find({ MaSP: id }).exec();
};

export const createDetailPro = (detailPro) => {
  return model.create(detailPro);
};

export const deleteDetailProById = (id) => {
  return model.findByIdAndDelete(id).exec();
};

export const updateDetailPro = (id, content) => {
  return model
    .findByIdAndUpdate(id, {
      $set: {
        ChiTiet: content,
      },
    })
    .exec();
};
