import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  listAccount: [],
  AccountItem: null,
};

export const accountSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    getAllAccounts(state) {},
    retrieveAccounts(state, action: PayloadAction<any>) {
      state.listAccount = action.payload;
    },
    getAccountItem(state, action: PayloadAction<number>) {},
    retrieveAccountItem(state, action: PayloadAction<any>) {
      state.AccountItem = action.payload;
    },
    updateAccount(state, action: PayloadAction<any>) {
      state.listAccount = state.listAccount.map((acc) => {
        if (acc._id === action.payload.id) {
          return {
            ...acc,
            KhoaTK: action.payload.isClose,
          };
        }
        return acc;
      });
    },
    createAccount(state, action: PayloadAction<any>) {},
    createAccountSuccess(state, action: PayloadAction<any>) {
      state.listAccount.push(action.payload);
    },
  },
});

export const {
  getAllAccounts,
  retrieveAccounts,
  getAccountItem,
  retrieveAccountItem,
  updateAccount,
  createAccount,
  createAccountSuccess,
} = accountSlice.actions;

export default accountSlice.reducer;
