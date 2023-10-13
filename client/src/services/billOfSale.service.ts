import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllBillOfSale = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/billOfSale`,
    headers: setToken(),
  });
};
export const getBillOfSaleById = (id) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/billOfSale/billOfSaleById/${id}`,
    headers: setToken(),
  });
};
export const getBillOfSaleByIdClient = (id) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/billOfSale/getBillOfSaleByIdClient/${id}`,
    headers: setToken(),
  });
};

export const getBillOfSaleOfClientOrderByIdClient = (id) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/billOfSale/getBillOfSaleOfClientOrderByIdClient/${id}`,
    headers: setToken(),
  });
};

export const getRevenueByDate = (data) => {

  return axios({
    method: "post",
    url: `http://localhost:3000/api/billOfSale/getAllRevenue`,
    headers: setToken(),
    data: data,
  });
};
export const getRevenueByDateCancel = (data) => {

  return axios({
    method: "post",
    url: `http://localhost:3000/api/billOfSale/getRevenueCancel`,
    headers: setToken(),
    data: data,
  });
};

export const getRevenueByDateBought = (data) => {

  return axios({
    method: "post",
    url: `http://localhost:3000/api/billOfSale/getRevenueBought`,
    headers: setToken(),
    data: data,
  });
};
export const getRevenueByDateBuying = (data) => {

  return axios({
    method: "post",
    url: `http://localhost:3000/api/billOfSale/getRevenueBuying`,
    headers: setToken(),
    data: data,
  });
};

export const getBillBoughtOfYear = (year) => {

  return axios({
    method: "get",
    url: `http://localhost:3000/api/billOfSale/getBillBoughtOfYear?year=${year}`,
    headers: setToken(),
  });
};

export const getBillBuyingOfYear = (year) => {

  return axios({
    method: "get",
    url: `http://localhost:3000/api/billOfSale/getBillBuyingOfYear?year=${year}`,
    headers: setToken(),
  });
};

export const getBillCancelOfYear = (year) => {

  return axios({
    method: "get",
    url: `http://localhost:3000/api/billOfSale/getBillCancelOfYear?year=${year}`,
    headers: setToken(),
  });
};

export const updateBillOfSale = (id, bill) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/billOfSale/${id}`,
    headers: setToken(),
    data: bill,
  });
};

export const createBillOfSale = (bill) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/billOfSale`,
    headers: setToken(),
    data: bill,
  });
};
