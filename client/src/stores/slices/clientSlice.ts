import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  listClient: [],
  listHashSet: [],
  clientItem: null,
};

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getAllClients(state) {},
    retrieveClients(state, action: PayloadAction<any>) {
      state.listClient = action.payload;
    },
    getClientItem(state, action: PayloadAction<any>) {},
    getClientItemByPhone(state, action: PayloadAction<any>) {},
    retrieveClientItem(state, action: PayloadAction<any>) {
      state.clientItem = action.payload;
    },
    getListClientAndTotalMoney(state, action: PayloadAction<any>) {},
    retrieveListHashSetClient(state, action: PayloadAction<any>) {
      state.listHashSet = action.payload;
    },
    removeClientItemInStore(state) {
      state.clientItem = null;
    },
    createClient(state, action: PayloadAction<any>) {},
    createClientSuccess(state, action: PayloadAction<any>) {
      state.listClient.push(action.payload);
    },
    updateClient(state, action: PayloadAction<any>) {
      state.listClient = state.listClient.map((client) => {
        if (client._id === action.payload.id) {
          return {
            ...client,
            Ten: action.payload.name,
            Email: action.payload.email,
            GioiTinh: action.payload.sex,
            DiaChi: action.payload.address,
            NgaySinh: new Date(action.payload.birthday),
          };
        }
        return client;
      });
    },
    updateInformationClient(state, action: PayloadAction<any>) {
      state.listClient = state.listClient.map((client) => {
        if (client._id === action.payload.id) {
          return {
            ...client,
            Ten: action.payload.name,
            Email: action.payload.email,
            GioiTinh: action.payload.sex,
            DiaChi: action.payload.address,
            NgaySinh: new Date(action.payload.birthday),
          };
        }
        return client;
      });
    },
    deleteClient(state, action: PayloadAction<string>) {
      state.listClient = state.listClient.filter(
        (client) => client._id !== action.payload
      );
    },
  },
});

export const {
  getAllClients,
  getListClientAndTotalMoney,
  retrieveListHashSetClient,
  retrieveClients,
  getClientItem,
  retrieveClientItem,
  createClient,
  createClientSuccess,
  updateClient,
  deleteClient,
  getClientItemByPhone,
  removeClientItemInStore,
  updateInformationClient,
} = clientSlice.actions;

export default clientSlice.reducer;
