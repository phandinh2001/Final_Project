import { takeLatest } from "redux-saga/effects";

import {
  createAccount,
  getAllAccounts,
  updateAccount,
} from "../slices/accountSlice";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandItem,
  updateBrand,
} from "../slices/brandSlice";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryItem,
  updateCategory,
} from "../slices/categorySlice";
import {
  createClient,
  deleteClient,
  getAllClients,
  getClientItem,
  getClientItemByPhone,
  getListClientAndTotalMoney,
  updateClient,
  updateInformationClient,
} from "../slices/clientSlice";
import {
  createDetailCate,
  deleteDetailCate,
  getAllDetailCategory,
  getDetailCategoryItem,
  updateDetailCategory,
} from "../slices/detailCategorySlice";
import { getAllDetailPro, getDetailProItem } from "../slices/detailProSlice";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllProductByIdOfDetailCate,
  getInventoryAndSold,
  getProductById,
  getProductsByIdOfSupplier,
  searchProduct,
  updateProduct,
} from "../slices/productSlice";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierItem,
  updateSupplier,
} from "../slices/supplierSlice";
import {
  login,
  logout,
  registerClient,
  updateAvatarByPhone,
} from "../slices/userSlice";
import {
  createAccountSaga,
  getAllAccountSaga,
  updateAccountSaga,
} from "./account";
import {
  createBrandSaga,
  deleteBrandSaga,
  getAllBrandSaga,
  getBrandItemSaga,
  updateBrandSaga,
} from "./brand";
import {
  createCategorySaga,
  deleteCategorySaga,
  getAllCategoriesSaga,
  getCategoryItemSaga,
  updateCategorySaga,
} from "./category";
import {
  createClientSaga,
  deleteClientSaga,
  getAllClientSaga,
  getClientItemByPhoneSaga,
  getClientItemSaga,
  getListClientAndTotalMoneySaga,
  updateClientSaga,
  updateInformationClientSaga,
} from "./client";
import {
  createDetailCateSaga,
  deleteDetailCateSaga,
  getAllDetailCategorySaga,
  getDetailCategoryItemSaga,
  updateDetailCateSaga,
} from "./detailCategory";
import { getAllDetailProSaga, getDetailProItemSaga } from "./detailPro";
import {
  createProductSaga,
  deleteProductSaga,
  getAllProductOfDetailCateSaga,
  getAllProductSaga,
  getInventoryAndSoldSaga,
  getProductByIdSaga,
  getProductsByIdOfSupplierSaga,
  searchProductSaga,
  updateProductSaga,
} from "./product";
import {
  createSupplierSaga,
  deleteSupplierSaga,
  getAllSupplierSaga,
  getSupplierItemSaga,
  updateSupplierSaga,
} from "./supplier";
import {
  loginSaga,
  logoutSaga,
  registerClientSaga,
  updateAvatarByPhoneSaga,
} from "./user";
import {
  cancelBillOfSale,
  createBillOfSale,
  getAllBillOfSale,
  getBillOfSaleByIdClient,
  getBillOfSaleOfClientOrderByIdClient,
  getDataChartOfBillOfSale,
  updatePayBillOfSale,
  updateStatusBillOfSale,
} from "../slices/billOfSaleSlice";
import {
  cancelBillOfSaleSaga,
  createBillOfSaleSaga,
  getAllBillOfSaleSaga,
  getBillOfSaleByIdClientSaga,
  getBillOfSaleOfClientOrderByIdClientSaga,
  getDataChartBillOfSaleSaga,
  updatePayBillOfSaleSaga,
  updateStatusBillOfSaleSaga,
} from "./billOfSale";
import {
  getAllDetailBillOfSaleByHashSet,
  getDetailBillOfSaleByHashSetOfDate,
  getDetailBillOfSaleByIdBill,
} from "../slices/detailBillOfSaleSlice";
import {
  getAllDetailBillByHashSetSaga,
  getDetailBillByHashSetOfDateSaga,
  getDetailBillOfSaleByIdBillSaga,
} from "./detailBillOfSale";
import { getAdminItemByPhone, updateAdmin } from "../slices/adminSlice";
import { getAdminByPhoneSaga, updateAdminSaga } from "./admin";
import {
  createCartItem,
  deleteCartItem,
  deleteManyCartByIdClient,
  getCartByIdClient,
  updateCart,
} from "../slices/cartSlice";
import {
  createCartItemSaga,
  deleteCartItemSaga,
  deleteManyCartByIdClientSaga,
  getCartByIdClientSaga,
  updateCartSaga,
} from "./cart";
import {
  cancelBillImport,
  createBillImport,
  getAllBillImport,
  updatePayBillImport,
  updateStatusBillImport,
} from "../slices/billImportSlice";
import {
  cancelBillImportSaga,
  createBillImportSaga,
  getAllBillImportSaga,
  updatePayBillImportSaga,
  updateStatusBillImportSaga,
} from "./billImport";
import { getDetailBillImportByIdBill } from "../slices/detailBillImportSlice";
import { getDetailBillImportByIdBillSaga } from "./detailBillImport";

function* root() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(logout.type, logoutSaga);
  yield takeLatest(registerClient.type, registerClientSaga);
  yield takeLatest(updateAvatarByPhone.type, updateAvatarByPhoneSaga);
  yield takeLatest(getAllProduct.type, getAllProductSaga);
  yield takeLatest(getInventoryAndSold.type, getInventoryAndSoldSaga);
  yield takeLatest(searchProduct.type, searchProductSaga);
  yield takeLatest(getAllDetailCategory.type, getAllDetailCategorySaga);
  yield takeLatest(getProductById.type, getProductByIdSaga);
  yield takeLatest(
    getProductsByIdOfSupplier.type,
    getProductsByIdOfSupplierSaga
  );
  yield takeLatest(
    getAllProductByIdOfDetailCate.type,
    getAllProductOfDetailCateSaga
  );
  yield takeLatest(deleteProduct.type, deleteProductSaga);
  yield takeLatest(createProduct.type, createProductSaga);
  yield takeLatest(updateProduct.type, updateProductSaga);
  yield takeLatest(getDetailCategoryItem.type, getDetailCategoryItemSaga);
  yield takeLatest(getAllBrands.type, getAllBrandSaga);
  yield takeLatest(getBrandItem.type, getBrandItemSaga);
  yield takeLatest(createBrand.type, createBrandSaga);
  yield takeLatest(updateBrand.type, updateBrandSaga);
  yield takeLatest(deleteBrand.type, deleteBrandSaga);
  yield takeLatest(getAllSuppliers.type, getAllSupplierSaga);
  yield takeLatest(getSupplierItem.type, getSupplierItemSaga);
  yield takeLatest(createSupplier.type, createSupplierSaga);
  yield takeLatest(deleteSupplier.type, deleteSupplierSaga);
  yield takeLatest(updateSupplier.type, updateSupplierSaga);
  yield takeLatest(getAllCategories.type, getAllCategoriesSaga);
  yield takeLatest(getCategoryItem.type, getCategoryItemSaga);
  yield takeLatest(deleteCategory.type, deleteCategorySaga);
  yield takeLatest(updateCategory.type, updateCategorySaga);
  yield takeLatest(createCategory.type, createCategorySaga);
  yield takeLatest(createDetailCate.type, createDetailCateSaga);
  yield takeLatest(deleteDetailCate.type, deleteDetailCateSaga);
  yield takeLatest(getAllDetailPro.type, getAllDetailProSaga);
  yield takeLatest(getDetailProItem.type, getDetailProItemSaga);
  yield takeLatest(updateDetailCategory.type, updateDetailCateSaga);
  yield takeLatest(getAllAccounts.type, getAllAccountSaga);
  yield takeLatest(updateAccount.type, updateAccountSaga);
  yield takeLatest(createAccount.type, createAccountSaga);
  yield takeLatest(getAllClients.type, getAllClientSaga);
  yield takeLatest(createClient.type, createClientSaga);
  yield takeLatest(updateClient.type, updateClientSaga);
  yield takeLatest(updateInformationClient.type, updateInformationClientSaga);
  yield takeLatest(deleteClient.type, deleteClientSaga);
  yield takeLatest(getClientItem.type, getClientItemSaga);
  yield takeLatest(getClientItemByPhone.type, getClientItemByPhoneSaga);
  yield takeLatest(getAllBillOfSale.type, getAllBillOfSaleSaga);
  yield takeLatest(cancelBillOfSale.type, cancelBillOfSaleSaga);
  yield takeLatest(updateStatusBillOfSale.type, updateStatusBillOfSaleSaga);
  yield takeLatest(updatePayBillOfSale.type, updatePayBillOfSaleSaga);
  yield takeLatest(createBillOfSale.type, createBillOfSaleSaga);
  yield takeLatest(getDataChartOfBillOfSale.type, getDataChartBillOfSaleSaga);
  yield takeLatest(
    getDetailBillOfSaleByIdBill.type,
    getDetailBillOfSaleByIdBillSaga
  );
  yield takeLatest(
    getDetailBillOfSaleByHashSetOfDate.type,
    getDetailBillByHashSetOfDateSaga
  );
  yield takeLatest(
    getBillOfSaleOfClientOrderByIdClient.type,
    getBillOfSaleOfClientOrderByIdClientSaga
  );
  yield takeLatest(
    getAllDetailBillOfSaleByHashSet.type,
    getAllDetailBillByHashSetSaga
  );
  yield takeLatest(getBillOfSaleByIdClient.type, getBillOfSaleByIdClientSaga);
  yield takeLatest(
    getListClientAndTotalMoney.type,
    getListClientAndTotalMoneySaga
  );
  yield takeLatest(getAdminItemByPhone.type, getAdminByPhoneSaga);
  yield takeLatest(updateAdmin.type, updateAdminSaga);
  yield takeLatest(getCartByIdClient.type, getCartByIdClientSaga);
  yield takeLatest(updateCart.type, updateCartSaga);
  yield takeLatest(deleteCartItem.type, deleteCartItemSaga);
  yield takeLatest(createCartItem.type, createCartItemSaga);
  yield takeLatest(deleteManyCartByIdClient.type, deleteManyCartByIdClientSaga);
  yield takeLatest(getAllBillImport.type, getAllBillImportSaga);
  yield takeLatest(updatePayBillImport.type, updatePayBillImportSaga);
  yield takeLatest(updateStatusBillImport.type, updateStatusBillImportSaga);
  yield takeLatest(cancelBillImport.type, cancelBillImportSaga);
  yield takeLatest(createBillImport.type, createBillImportSaga);
  yield takeLatest(
    getDetailBillImportByIdBill.type,
    getDetailBillImportByIdBillSaga
  );
}

export default root;
