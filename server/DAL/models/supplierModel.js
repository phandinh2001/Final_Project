import mongoose from 'mongoose';

import { SupplierSchema } from '../schemas/supplierSchema';

const model = mongoose.model("nhacungcaps", SupplierSchema);

export const getAllSuppliers = () => {
  return model.find().exec();
};
export const getSupplierById = (id) => {
  return model.find({ Ma: id }).limit(1).exec();
};
export const getAllSupplierSortById = () => {
  return model.find().sort({ Ma: -1 }).exec();
};

export const getSupplierByIdOfMongo = (id) => {
  return model.findById(id).exec();
};

export const createSupplier = (newSupplier) => {
  return model.create(newSupplier);
};
export const updateSupplier = (id, supplier) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      Ten: supplier.Ten,
      SDT: supplier.SDT,
      DiaChi: supplier.DiaChi,
    },
  });
};
export const deleteSupplier = (id) => {
  return model.findByIdAndDelete(id);
};
