import mongoose from "mongoose";
import { AdminSchema } from "../schemas/adminSchema";

const model = mongoose.model("quanlys", AdminSchema);

export const getAllAdmins = () => {
  return model.find().exec();
};
export const getAdminByPhone = (phone) => {
  return model.find({ SDT: phone }).exec();
};
export const getAdminById = (id) => {
  return model.find({ Ma: id }).exec();
};
export const getAllAdminsSortById = () => {
  return model.find().sort({ Ma: -1 }).exec();
};
export const createAdmin = (client) => {
  return model.create(client);
};
export const updateAdmin = (id, admin) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      Ten: admin.Ten,
      NgaySinh: admin.NgaySinh,
      SDT: admin.SDT,
      DiaChi: admin.DiaChi,
      Email: admin.Email,
      GioiTinh: admin.GioiTinh,
    },
  });
};

export const deleteAdminById = (id) => {
  return model.findByIdAndDelete(id).exec();
};

