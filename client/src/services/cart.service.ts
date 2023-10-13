import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getCartByIdClient = (id) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/cart/getCartByIdClient/${id}`,
    headers: setToken(),
  });
};

export const updateCartById = (id, cart) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/cart/${id}`,
    headers: setToken(),
    data: cart,
  });
};

export const deleteCartItem = (id) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/cart/${id}`,
    headers: setToken(),
  });
};

export const deleteManyCartByIdClient = (id) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/cart/deleteManyCartByIdClient/${id}`,
    headers: setToken(),
  });
};
export const createCartItem = (cartItem) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/cart`,
    headers: setToken(),
    data: cartItem,
  });
};
