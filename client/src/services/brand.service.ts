import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllBrands = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/brands`,
    headers: setToken(),
  });
};

export const getBrandById = (id: number) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/brands/brandById?id=${id}`,
    headers: setToken(),
  });
};

export const createBrand = (newBrand) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/brands/`,
    headers: setToken(),
    data: newBrand,
  });
};

export const updateBrand = (id, brand) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/brands/${id}`,
    headers: setToken(),
    data: brand,
  });
};
export const deleteBrand = (id) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/brands/${id}`,
    headers: setToken(),
  });
};
