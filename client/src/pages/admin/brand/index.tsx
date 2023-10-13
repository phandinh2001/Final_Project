import React, { useState } from "react";

import WrapperBody from "../../../layouts/admin/wrapperBody";
import { useNavigate } from "react-router-dom";
import BrandTBody from "../../../components.admin/BrandTBody";
import CreateBrand from "../../../modals/modal.create/createBrand";

const Brand = () => {
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();
  const handleOpenCreate = () => {
    setIsCreate(true);
    navigate("/admin/quan_ly/thuong_hieu/them_moi");
  };
  return (
    <WrapperBody title="Danh sách thương hiệu" onClickBtn={handleOpenCreate}>
      <div>
        {isCreate && <CreateBrand setIsCreate={setIsCreate}/>}
        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên Thương hiệu</th>
              <th style={{ width: "100px" }}></th>
            </tr>
          </thead>
          <tbody>
            <BrandTBody />
          </tbody>
        </table>
      </div>
    </WrapperBody>
  );
};

export default Brand;
