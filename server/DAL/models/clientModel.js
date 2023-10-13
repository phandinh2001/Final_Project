import mongoose from "mongoose";
import { ClientSchema } from "../schemas/clientSchema";

const model = mongoose.model("khachhangs", ClientSchema);

export const getAllClients = () => {
  return model.find().exec();
};
export const getClientByPhone = (phone) => {
  return model.find({ SDT: phone }).exec();
};
export const getClientById = (id) => {
  return model.find({ Ma: id }).exec();
};
export const getAllClientsSortById = () => {
  return model.find().sort({ Ma: -1 }).exec();
};
export const createClient = (client) => {
  return model.create(client);
};
export const updateClient = (id, client) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      Ten: client.Ten,
      NgaySinh: client.NgaySinh,
      SDT: client.SDT,
      DiaChi: client.DiaChi,
      Email: client.Email,
      GioiTinh: client.GioiTinh,
    },
  });
};
// export const getAllCategoriesSortById = () => {
//   return model.find().sort({ Ma: -1 }).exec();
// };
// export const getCategoryByIdOfMongo = (id) => {
//   return model.findById(id).exec();
// };

export const deleteClientById = (id) => {
  return model.findByIdAndDelete(id).exec();
};
// export const updateCategoryById = (id, category) => {
//   return model.findByIdAndUpdate(id, {
//     $set: {
//       Ten: category.Ten,
//     },
//   });
// };

// export const createCategory= (category) => {
//   return model.create(category);
// };
