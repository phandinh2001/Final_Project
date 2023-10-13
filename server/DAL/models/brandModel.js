import mongoose from 'mongoose';

import { BrandSchema } from '../schemas/brandSchema';

const model = mongoose.model("thuonghieus", BrandSchema);

export const getAllBrand = () => {
  return model.find().exec();
};
export const getBrandById = (id) => {
  return model.find({ Ma: id }).limit(1).exec();
};
export const getAllBrandSortById = () => {
  return model.find().sort({ Ma: -1 }).exec();
};
export const getBrandByIdOfMongo = (id) => {
  return model.findById(id).exec();
};
export const createBrand = (newBrand) => {
  return model.create(newBrand);
};

export const updateBrand = (id, brand) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      Ten: brand.Ten,
    },
  });
};

export const deleteBrand = (id) => {
  return model.findByIdAndDelete(id);
};
