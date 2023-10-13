import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllClients = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/clients`,
    headers: setToken(),
  });
};
export const getClientItemById = (id) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/clients/getClientById/${id}`,
    headers: setToken(),
  });
};

export const getListClientAndTotalMoney = (data) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/clients/getListClientAndTotalMoney`,
    headers: setToken(),
    data: data,
  });
};

export const findClientByPhone = (phone) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/clients/getClientByPhone?phone=${phone}`,
    headers: setToken(),
  });
};

export const updateClient = (id, name, birthday, email?, sex?, address?) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/clients/${id}`,
    headers: setToken(),
    data: {
      Ten: name,
      NgaySinh: birthday,
      Email: email,
      GioiTinh: sex,
      DiaChi: address,
    },
  });
};

export const updateInformationClient = (id, client) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/clients/${id}`,
    headers: setToken(),
    data: client,
  });
};

export const createClient = (
  phone: string,
  name: string,
  birthday: string,
  email?: string,
  sex?: string,
  address?: string
) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/clients`,
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

export const deleteClientById = (id) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/clients/${id}`,
    headers: setToken(),
  });
};
