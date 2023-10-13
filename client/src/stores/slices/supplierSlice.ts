import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  listSupplier: [],
  supplierItem: null,
};

export const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    getAllSuppliers(state) {},
    retrieveSuppliers(state, action: PayloadAction<any>) {
      state.listSupplier = action.payload;
    },
    getSupplierItem(state, action: PayloadAction<number>) {},
    retrieveSupplierItem(state, action: PayloadAction<any>) {
      state.supplierItem = action.payload;
    },
    createSupplier(state, action: PayloadAction<any>) {},
    createSupplierSuccess(state, action: PayloadAction<any>) {
      state.listSupplier.push(action.payload);
    },
    deleteSupplier(state, action: PayloadAction<string>) {},
    deleteSupplierSuccess(state, action: PayloadAction<string>) {
      state.listSupplier = state.listSupplier.filter(
        (sup) => sup._id !== action.payload
      );
    },
    updateSupplier(state, action: PayloadAction<any>) {
      const { id, supplier } = action.payload;
      state.listSupplier = state.listSupplier.map((sup) => {
        if (sup._id === id) {
          return {
            ...sup,
            Ten: supplier.Ten,
            SDT: supplier.SDT,
            DiaChi: supplier.DiaChi,
          };
        }
        return sup;
      });
    },
  },
});

export const {
  getAllSuppliers,
  retrieveSuppliers,
  getSupplierItem,
  retrieveSupplierItem,
  createSupplier,
  createSupplierSuccess,
  deleteSupplier,
  deleteSupplierSuccess,
  updateSupplier,
} = supplierSlice.actions;

export default supplierSlice.reducer;
