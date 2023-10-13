import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  listProduct: [],
  productItem: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProduct(state) {},
    getInventoryAndSold(state) {},
    getProductsByIdOfSupplier(state,action: PayloadAction<any>) {},
    retrieveProducts(state, action: PayloadAction<any>) {
      state.listProduct = action.payload;
    },
    getAllProductByIdOfDetailCate(state, action: PayloadAction<any>) {},
    getProductById(state, action: PayloadAction<string>) {},
    retrieveProductItem(state, action: PayloadAction<any>) {
      state.productItem = action.payload;
    },
    searchProduct(state, action: PayloadAction<any>) {},
    deleteProduct(state, action: PayloadAction<string>) {
      state.listProduct = state.listProduct.filter(
        (pro) => pro._id !== action.payload
      );
    },
    createProduct(state, action: PayloadAction<any>) {},
    createProductSuccess(state, action: PayloadAction<any>) {
      state.listProduct.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<any>) {
      const { product } = action.payload;
      state.listProduct = state.listProduct.map((pro) => {
        if (pro._id === product.id) {
          return {
            ...pro,
            Ten: product.Ten,
            GiaBan: product.GiaBan,
            GiaNhap: product.GiaNhap,
            MaLoai: product.MaLoai,
            KhuyenMai: product.KhuyenMai,
            MaThuongHieu: product.MaThuongHieu,
            MaNCC: product.MaNCC,
            GioiTinh: product.GioiTinh,
            MoTa: product.MoTa,
            KichThuoc_Mau: product.KichThuoc_Mau,
            Anh: product.Anh,
            SoLuong: product.SoLuong,
          };
        }
        return pro;
      });
    },
    removeProductItemInStore(state) {
      state.productItem = null;
    },
    removeListProductInStore(state) {
      state.listProduct = [];
    },
  },
});

export const {
  createProductSuccess,
  getAllProduct,
  retrieveProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProductByIdOfDetailCate,
  searchProduct,
  retrieveProductItem,
  removeProductItemInStore,
  getInventoryAndSold,
  removeListProductInStore,
  getProductsByIdOfSupplier,
} = productSlice.actions;

export default productSlice.reducer;
