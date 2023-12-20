import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { getAllProduct } from "../../../stores/slices/productSlice";
import Products from "../../../components.admin/ProductTBody";
import { getAllDetailCategory } from "../../../stores/slices/detailCategorySlice";
import CreateProduct from "../../../modals/modal.create/createProduct";
import WrapperBody from "../../../layouts/admin/wrapperBody";

const Product = () => {
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllDetailCategory());
  }, [dispatch]);
  const handleOpenCreate = () => {
    setIsCreate(true);
    navigate("/admin/quan_ly/san_pham/them_moi");
  };
  return (
    <WrapperBody title="Danh sách sản phẩm" onClickBtn={handleOpenCreate}>
      <>
        {isCreate && <CreateProduct setIsCreate={setIsCreate} />}
        <table className="">
          <thead>
            <tr>
              <th style={{textAlign: 'center'}}>Mã</th>
              <th></th>
              <th style={{textAlign: 'center'}}>Tên sản phẩm</th>
              <th style={{textAlign: 'center'}}>Giá bán</th>
              <th style={{textAlign: 'center'}}>Số lượng</th>
              <th style={{textAlign: 'center'}}>Loại</th>
              <th style={{textAlign: 'center'}}>Giới tính</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <Products />
          </tbody>
        </table>
      </>
    </WrapperBody>
  );
};

export default Product;
