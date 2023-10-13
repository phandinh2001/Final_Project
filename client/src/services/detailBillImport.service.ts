import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllDetailBillImport = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/detailBillImport`,
    headers: setToken(),
  });
};

export const getDetailBillImportByIdBill = (id) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/detailBillImport/getDetailBillImportByIdBill/${id}`,
    headers: setToken(),
  });
};

export const createDetailBillImport = (detailBill) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/detailBillImport`,
    headers: setToken(),
    data: detailBill,
  });
};

