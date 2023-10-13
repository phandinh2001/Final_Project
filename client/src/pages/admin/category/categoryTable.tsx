import React, { useState } from "react";

import Category from "../../../components.admin/Category";
import CreateCategory from "../../../modals/modal.create/createCategoryModel";
import WrapperBody from "../../../layouts/admin/wrapperBody";

const CategoryTable = () => {
  const [openModelCreate, setOpenModelCreate] = useState(false);

  const handleOpenCreate = () => {
    setOpenModelCreate(true);
  };
  return (
    <WrapperBody title="Danh sách loại sản phẩm" onClickBtn={handleOpenCreate}>
      <>
        {openModelCreate === true && (
          <CreateCategory
            openModel={openModelCreate}
            setOpenModel={setOpenModelCreate}
            title="Thêm mới loại sản phẩm"
            url="/admin/quan_ly/loai_san_pham"
          />
        )}
        <table >
          <thead>
            <tr>
              <th>Mã</th>
              <th>Loại sản phẩm</th>
              <th style={{ width: "100px" }}></th>
            </tr>
          </thead>
          <tbody>
            <Category />
          </tbody>
        </table>
      </>
    </WrapperBody>
  );
};

export default CategoryTable;
