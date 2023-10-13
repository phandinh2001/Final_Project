import mongoose from "mongoose";
import { DetailCategorySchema } from "../schemas/detailCategorySchema";

const model = mongoose.model("chitietloais", DetailCategorySchema);

export const getAllDetailCategory = () => {
  return model.find().exec();
};
export const getAllDetailCateSortById = () => {
  return model.find().sort({ Ma: -1 }).exec();
};
export const getDetailCategoryById = (id) => {
  return model.find({ Ma: id }).limit(1).exec();
};
export const getDetailCategoryByIdOfCate = (id) => {
  return model.find({ MaLoai: id }).exec();
};

export const getDetailCateByIdOfMongo = (id) => {
  return model.findById(id).exec();
};

export const createDetailCategory = (detailCategory) => {
  return model.create(detailCategory);
};

export const deleteDetailCateById = (id) => {
  return model.findByIdAndDelete(id).exec();
};

export const updateDetailCate = (id, detailCate) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      Ten: detailCate.Ten,
      MaLoai: detailCate.MaLoai,
    },
  });
};
