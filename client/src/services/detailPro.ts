import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllDetailPro = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/detailProduct`,
    headers: setToken(),
  });
};

export const getDetailProById = (id: number) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/detailProduct/getDetailProductById/${id}`,
    headers: setToken(),
  });
};

export const createDetailPro = (detail) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/detailProduct`,
    headers: setToken(),
    data: detail,
  });
};

export const deleteDetailPro = (id) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/detailProduct/${id}`,
    headers: setToken(),
  });
};

export const updateDetailPro = (id, detail) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/detailProduct/${id}`,
    headers: setToken(),
    data: {
      ChiTiet: detail,
    },
  });
};
