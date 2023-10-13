import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const getAllAccounts = () => {
  return axios({
    method: "get",
    url: "http://localhost:3000/api/users/",
    headers: setToken(),
  });
};
export const updateAccounts = (id, account) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/users/${id}`,
    headers: setToken(),
    data: account,
  });
};
