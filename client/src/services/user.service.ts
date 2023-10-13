import axios from "axios";
import { setToken } from "../helpers/setTokenAxios";

export const callApiLogin = (phone: string, password: string): any => {
  return axios({
    method: "post",
    url: "http://localhost:3000/api/users/signIn",
    data: { phone, password },
  })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getMe = () => {
  return axios({
    method: "get",
    url: "http://localhost:3000/api/users/getMe",
    headers: setToken(),
  });
};

export const isPhoneExisted = (phone: string) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/users/getUserByPhone?phone=${phone}`,
    headers: setToken(),
  });
};

export const register = (
  phone: string,
  password: string,
  name: string,
  birthday: string,
  isAdmin?: boolean,
  avatar?: string
) => {
  return axios({
    method: "post",
    url: "http://localhost:3000/api/users/signUp",
    data: {
      SDT: phone,
      MatKhau: password,
      Ten: name,
      NgaySinh: birthday,
      PhanQuyen: isAdmin ? "QuanLy" : "KhachHang",
      Anh: avatar,
    },
  });
};

export const updatePassword = (
  phone: string,
  currentPassword: string,
  newPassword: string
) => {
  return axios({
    method: "post",
    url: "http://localhost:3000/api/users/updatePassword",
    data: { phone, currentPassword, newPassword },
  });
};
export const updateUser = (user) => {
  return axios({
    method: "post",
    url: "http://localhost:3000/api/users/updateUser",
    data: user,
  });
};
