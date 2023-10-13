import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllBillImport = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/billImport`,
    headers: setToken(),
  });
};

export const updateBillImport = (id, bill) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/billImport/${id}`,
    headers: setToken(),
    data: bill,
  });
};

export const createBillImport = (bill) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/billImport`,
    headers: setToken(),
    data: bill,
  });
};
