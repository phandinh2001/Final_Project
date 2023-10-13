import Account from "../pages/admin/account";
import BillImport from "../pages/admin/billImport";
import BillOfSale from "../pages/admin/billOfSale";
import Brand from "../pages/admin/brand";
import Category from "../pages/admin/category";
import Client from "../pages/admin/client";
import Home from "../pages/admin/home";
import Information from "../pages/admin/information";
import Message from "../pages/admin/message";
import Product from "../pages/admin/product";
import Supplier from "../pages/admin/supplier";

export const configAdmin = [
  {
    path: "/admin",
    component: Home,
  },
  {
    path: "/admin/quan_ly",
    component: Product,
  },
  {
    path: "/admin/ho_so",
    component: Information,
  },
  {
    path: "/admin/tin_nhan",
    component: Message,
  },
  {
    path: "/admin/quan_ly/san_pham",
    component: Product,
  },
  {
    path: "/admin/quan_ly/san_pham/:id",
    component: Product,
  },
  {
    path: "/admin/quan_ly/san_pham/them_moi",
    component: Product,
  },
  {
    path: "/admin/quan_ly/san_pham/them_chi_tiet_sp",
    component: Product,
  },
  {
    path: "/admin/quan_ly/san_pham/them_chi_tiet_sp/:id",
    component: Product,
  },
  {
    path: "/admin/quan_ly/hoa_don_ban",
    component: BillOfSale,
  },
  {
    path: "/admin/quan_ly/hoa_don_ban/:id",
    component: BillOfSale,
  },
  {
    path: "/admin/quan_ly/hoa_don_ban/them_moi",
    component: BillOfSale,
  },
  {
    path: "/admin/quan_ly/hoa_don_nhap",
    component: BillImport,
  },
  {
    path: "/admin/quan_ly/loai_san_pham",
    component: Category,
  },
  {
    path: "/admin/quan_ly/loai_san_pham/chi_tiet_loai/:id",
    component: Category,
  },
  {
    path: "/admin/quan_ly/loai_san_pham/loai/:id",
    component: Category,
  },
  {
    path: "/admin/quan_ly/khach_hang",
    component: Client,
  },
  {
    path: "/admin/quan_ly/khach_hang/:id",
    component: Client,
  },
  {
    path: "/admin/quan_ly/tai_khoan",
    component: Account,
  },
  {
    path: "/admin/quan_ly/tai_khoan/them_moi",
    component: Account,
  },
  {
    path: "/admin/quan_ly/nha_cung_cap",
    component: Supplier,
  },
  {
    path: "/admin/quan_ly/nha_cung_cap/:id",
    component: Supplier,
  },
  {
    path: "//admin/quan_ly/nha_cung_cap/them_moi",
    component: Supplier,
  },
  {
    path: "/admin/quan_ly/thuong_hieu",
    component: Brand,
  },
  {
    path: "/admin/quan_ly/thuong_hieu/:id",
    component: Brand,
  },
  {
    path: "/admin/quan_ly/thuong_hieu/them_moi",
    component: Brand,
  },
];
