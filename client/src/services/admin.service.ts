import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllAdmins = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/admins`,
    headers: setToken(),
  });
};
export const getAdminItemById = (id) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/admins/getAdminById/${id}`,
    headers: setToken(),
  });
};

export const findAdminByPhone = (phone) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/admins/getAdminByPhone?phone=${phone}`,
    headers: setToken(),
  });
};

export const updateAdmin = (id, admin) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/admins/${id}`,
    headers: setToken(),
    data: admin,
  });
};

export const createAdmin = (
  phone: string,
  name: string,
  birthday: string,
  email?: string,
  sex?: string,
  address?: string
) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/admins`,
    headers: setToken(),
    data: {
      SDT: phone,
      Ten: name,
      NgaySinh: birthday,
      GioiTinh: sex,
      DiaChi: address,
      Email: email,
    },
  });
};

export const deleteAdminById = (id) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/admins/${id}`,
    headers: setToken(),
  });
};
