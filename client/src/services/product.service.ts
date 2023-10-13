import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllProduct = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/products`,
    headers: setToken(),
  });
};
export const getProductById = (id: string) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/products/getProductById/${id}`,
    headers: setToken(),
  });
};
export const getProductsByIdOfSupplier = (id: string) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/products/getProductByIdOfSupplier?id=${id}`,
    headers: setToken(),
  });
};


export const getProductByIdNumber = (id) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/products/getProductByIdNumber?id=${id}`,
    headers: setToken(),
  });
};

export const getInventoryAndSold = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/products/getInventoryAndSold`,
    headers: setToken(),
  });
};

export const getAllProductByIdOfDetailCate = (id: string) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/products/getProductByIdOfDetailCate/${id}`,
    headers: setToken(),
  });
};

export const searchProductByName = (name) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/products/searchProductByName?Ten=${name}`,
    headers: setToken(),
  });
};

export const searchProductByNameAndIdCate = (name, idCate) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/products/searchProductByNameAndIdCate?Ten=${name}&MaLoai=${idCate}`,
    headers: setToken(),
  });
};

export const deleteProductById = (id: string) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/products/${id}`,
    headers: setToken(),
  });
};

export const createProduct = (product) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/products`,
    headers: setToken(),
    data: product,
  });
};

export const updateProductById = (product) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/products/${product.id}`,
    headers: setToken(),
    data: product,
  });
};

export const updateQuantity = (id, quantity) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/products/updateQuantity/${id}`,
    headers: setToken(),
    data: { quantity },
  });
};

export const updateColorAndSize = (id, colorAndSize) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/products/updateColorAndSize/${id}`,
    headers: setToken(),
    data: { KichThuoc_Mau: colorAndSize },
  });
};

export const updateQuantityOfSizeAndColor = (
  id,
  color,
  size,
  quantity,
) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/products/updateQuantityOfSizeAndColor`,
    headers: setToken(),
    data: { id, color, size, quantity },
  });
};
