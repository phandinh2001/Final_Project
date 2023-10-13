import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllDetailCategory = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/detailCategory`,
    headers: setToken(),
  });
};

export const getDetailCategoryById = (id: number) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/detailCategory/detailCategoryById?id=${id}`,
    headers: setToken(),
  });
};

export const createDetailCategory = (name: string, id: number) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/detailCategory`,
    headers: setToken(),
    data: {
      Ten: name,
      MaLoai: id,
    },
  });
};

export const deleteDetailCategoryById = (id: string) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/detailCategory/${id}`,
    headers: setToken(),
  });
};

export const updateDetailCate = (id: string, name: string, idCate: number) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/detailCategory/${id}`,
    headers: setToken(),
    data: {
      Ten: name,
      MaLoai: idCate,
    },
  });
};
