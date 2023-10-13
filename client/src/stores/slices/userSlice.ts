import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetMe, Login, LoginSuccess, UserState } from "../types/user";

const user = JSON.parse(localStorage.getItem("user")!);

const initialState: UserState = user
  ? {
      isLoggedIn: true,
      username: user.username,
      phone: user.phone,
      isAdmin: user.position === "QuanLy" ? true : false,
      avatar: user.avatar,
    }
  : {
      isLoggedIn: false,
      username: null,
      phone: null,
      isAdmin: false,
      avatar: null,
    };
export const userSlider = createSlice({
  name: "users",
  initialState,
  reducers: {
    getMe(state, action: PayloadAction<GetMe>) {},
    login(state, action: PayloadAction<Login>) {},
    registerClient(state, action: PayloadAction<any>) {},
    loginActionSuccess(state, action: PayloadAction<LoginSuccess>) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.phone = action.payload.phone;
      state.avatar = action.payload.avatar;
      state.isAdmin = action.payload.position === "QuanLy" ? true : false;
    },
    loginActionFail(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.phone = null;
      state.isAdmin = false;
      state.avatar = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.phone = null;
      state.isAdmin = false;
      state.avatar = null;
    },
    updateAvatarByPhone(state, action: PayloadAction<any>) {
      state.avatar = action.payload.Anh;
    },
    updateNameUser(state, action: PayloadAction<any>) {
      state.username = action.payload;
    },
  },
});

export const {
  login,
  loginActionSuccess,
  loginActionFail,
  logout,
  getMe,
  updateAvatarByPhone,
  updateNameUser,
  registerClient,
} = userSlider.actions;

export default userSlider.reducer;
