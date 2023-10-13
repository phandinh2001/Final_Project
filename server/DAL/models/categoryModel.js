import mongoose from "mongoose";
import { CategorySchema } from "../schemas/categorySchema";

const model = mongoose.model("loaisps", CategorySchema);

export const getAllCategories = () => {
  return model.find().exec();
};
export const getAllCategoriesSortById = () => {
  return model.find().sort({ Ma: -1 }).exec();
};
export const getCategoryById = (id) => {
  return model.find({ Ma: id }).limit(1).exec();
};
export const getCategoryByIdOfMongo = (id) => {
  return model.findById(id).exec();
};

export const deleteCategoryById = (id) => {
  return model.findByIdAndDelete(id).exec();
};
export const updateCategoryById = (id, category) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      Ten: category.Ten,
    },
  });
};

export const createCategory= (category) => {
  return model.create(category);
};
