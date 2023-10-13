import axios from 'axios';

import { setToken } from '../helpers/setTokenAxios';

export const getAllSuppliers = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/suppliers`,
    headers: setToken(),
  });
};

export const getSupplierById = (id: number) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/suppliers/supplierById?id=${id}`,
    headers: setToken(),
  });
};

export const createSupplier = (newSupplier) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/suppliers/`,
    headers: setToken(),
    data: newSupplier,
  });
};

export const deleteSupplier = (id) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/suppliers/${id}`,
    headers: setToken(),
  });
};

export const updateSupplier = (id, supplier) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/suppliers/${id}`,
    headers: setToken(),
    data: supplier,
  });
};
