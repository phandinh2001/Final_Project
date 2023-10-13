import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IconIc24FillArrowup } from "@gapo_ui/icon";
import { IconIc24FillArrowdown } from "@gapo_ui/icon";

import "./style.css";
import CategoryDetail from "../../../components.admin/CategoryDetail";
import CreateDetailCate from "../../../modals/modal.create/createDetailCate";
import {
  sortByIdCategoryAscending,
  sortByIdCategoryDecrease,
} from "../../../stores/slices/detailCategorySlice";
import WrapperBody from "../../../layouts/admin/wrapperBody";

const DetailTable = () => {
  const dispatch = useDispatch();

  const [openModelCreate, setOpenModelCreate] = useState(false);
  const [sortByCate, setSortByCate] = useState(false);
  const handleOpenCreate = () => {
    setOpenModelCreate(true);
  };

  const handleSortUp = () => {
    dispatch(sortByIdCategoryAscending());
    setSortByCate(true);
  };
  const handleSortDown = () => {
    dispatch(sortByIdCategoryDecrease());
    setSortByCate(false);
  };
  return (
    <WrapperBody
      title="Danh sách chi tiết loại sản phẩm"
      onClickBtn={handleOpenCreate}
    >
      <>
        {openModelCreate && (
          <CreateDetailCate
            openModel={openModelCreate}
            setOpenModel={setOpenModelCreate}
            title="Thêm mới chi tiết loại sản phẩm"
            url="/admin/quan_ly/loai_san_pham"
          />
        )}
        <table >
          <thead>
            <tr>
              <th>Mã</th>
              <th>Chi tiết Loại</th>
              <th>
                <span>Loại sản phẩm</span>
                {sortByCate ? (
                  <span className="icon-sort" onClick={handleSortDown}>
                    <IconIc24FillArrowdown size={14} />
                  </span>
                ) : (
                  <span className="icon-sort" onClick={handleSortUp}>
                    <IconIc24FillArrowup size={14} />
                  </span>
                )}
              </th>
              <th style={{ width: "100px" }}></th>
            </tr>
          </thead>
          <tbody>
            <CategoryDetail />
          </tbody>
        </table>
      </>
    </WrapperBody>
  );
};
export default DetailTable;
