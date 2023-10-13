import { combineReducers } from "redux";
import message from "./messageSlice";
import user from "./userSlice";
import products from "./productSlice";
import detailCategory from "./detailCategorySlice";
import brands from "./brandSlice";
import suppliers from "./supplierSlice";
import categories from "./categorySlice";
import detailPro from "./detailProSlice";
import accounts from "./accountSlice";
import clients from "./clientSlice";
import colorAndSize from "./colorAndSizeSlice";
import billOfSale from "./billOfSaleSlice";
import detailBillOfSale from "./detailBillOfSaleSlice";
import admin from "./adminSlice";
import cart from "./cartSlice";
import billImport from "./billImportSlice";
import detailBillImport from "./detailBillImportSlice";
export default combineReducers({
  message,
  user,
  products,
  detailCategory,
  brands,
  suppliers,
  categories,
  detailPro,
  accounts,
  clients,
  colorAndSize,
  billOfSale,
  detailBillOfSale,
  admin,
  cart,
  billImport,
  detailBillImport,
});
