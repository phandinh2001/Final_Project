import Purchase from "../pages/client/Purchase";
import Cart from "../pages/client/cart";
import Checkout from "../pages/client/checkout";
import Contact from "../pages/client/contact";
import DetailProduct from "../pages/client/detailProduct";
import Home from "../pages/client/home";
import Setting from "../pages/client/setting";
import Shop from "../pages/client/shop";

export const configClient = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/shop",
    component: Shop,
  },
  {
    path: "/shop/:id",
    component: DetailProduct,
  },
  {
    path: "/shop/search/:id",
    component: Shop,
  },
  {
    path: "/shop/search",
    component: Shop,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/purchase",
    component: Purchase,
  },
  {
    path: "/purchase/:id",
    component: Purchase,
  },  {
    path: "/setting/",
    component: Setting,
  },
];
