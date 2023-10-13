import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getConfigPayment = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/payment/config`,
    headers: setToken(),
  });
};

export const checkoutByVNPay = (data) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/payment/create_payment_url`,
    headers: setToken(),
    data: data,
  });
};
