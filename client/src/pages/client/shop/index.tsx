import React from "react";
import Banner from "../../../components.client/Banner/Banner";
import Category from "../../../components.client/Category";
import Product from "../../../components.client/Product";

import "./style.css";
const Shop = () => {
  return (
    <div>
      <Banner title="Sản phẩm" bread="BỘ SƯU TẬP SẢN PHẨM" />
      <section className="ftco-section bg-light">
        <div className="container container-product">
          <Product />
          <Category />
        </div>
      </section>
    </div>
  );
};
export default Shop;
