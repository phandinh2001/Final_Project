import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllCategories = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/categories`,
    headers: setToken(),
  });
};

export const getCategoryById = (id: number) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/categories/categoryById?id=${id}`,
    headers: setToken(),
  });
};

export const deleteCategoryById = (id: string) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/categories/${id}`,
    headers: setToken(),
  });
};

export const updateCategoryById = (id: string, name: string) => {
    
  return axios({
    method: "put",
    url: `http://localhost:3000/api/categories/${id}`,
    headers: setToken(),
    data: {
      Ten: name,
    },
  });
};
export const createCategory = (name:string) => {
    
    return axios({
      method: "post",
      url: `http://localhost:3000/api/categories/`,
      headers: setToken(),
      data: {
        Ten: name,
      },
    });
  };
