import React, { useEffect } from "react";
import Banner from "../../../components.client/Banner/Banner";
import ProductItem from "../../../components.client/ProductItem";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  removeProductItemInStore,
} from "../../../stores/slices/productSlice";
import { RootState } from "../../../stores";

const DetailProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { productItem } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(getProductById(location.pathname.split("/").reverse()[0]));
    return () => {
      dispatch(removeProductItemInStore());
    };
  }, [dispatch, location.pathname]);

  return (
    <div>
      <Banner title="Sản phẩm" bread="BỘ SƯU TẬP SẢN PHẨM" />
      {productItem ? (
        <section className="ftco-section bg-light">
          <div className="container">
            <ProductItem product={productItem} />
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default DetailProduct;
