import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import Item from "./Item";
import { getAllProduct } from "../../stores/slices/productSlice";

import "./style.css";
import Pagination from "../../components/Pagination";
import { getAllDetailBillOfSaleByHashSet } from "../../stores/slices/detailBillOfSaleSlice";

const PAGE_COUNT = 3;

interface Props {
  setIsAddPro?: (val: boolean) => void;
  setProItem?: (val: any) => void;
}
const Product = ({ setIsAddPro, setProItem }: Props) => {
  const { listProduct } = useSelector((state: RootState) => state.products);
  const { listHashSet } = useSelector(
    (state: RootState) => state.detailBillOfSale
  );

  const [arrProducts, setArrProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllDetailBillOfSaleByHashSet());
  }, [dispatch]);

  useEffect(() => {
    if (listProduct.length <= PAGE_COUNT) setArrProducts(listProduct);
  }, [listProduct, setArrProducts]);
  return (
    <>
      <div className="row-product">
        <div className="order-md-last">
          <div className="row" style={{ margin: "0", padding: "0" }}>
            {arrProducts && arrProducts.length > 0
              ? arrProducts.map((product: any, ind) => {
                  if (listHashSet) {
                    let check: boolean = false;
                    const arr = listHashSet.map((val, i) => {
                      if (val.idPro === product.Ma) {
                        check = true;
                        return (
                          <Item product={product} key={ind} sold={val.count} />
                        );
                      } else return "";
                    });
                    if (check) return arr;
                    else return <Item product={product} key={ind} />;
                  } else return <Item product={product} key={ind} />;
                })
              : "Not found any item"}
          </div>
          <div>
            {listProduct && listProduct.length > PAGE_COUNT && (
              <Pagination
                dataPerPage={PAGE_COUNT}
                setCurrentPageData={setArrProducts}
                data={listProduct}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
