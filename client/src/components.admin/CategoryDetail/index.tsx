import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconIc24FillPencil } from "@gapo_ui/icon";
import { IconIc24FillArchiveBoxXmark } from "@gapo_ui/icon";

import { RootState } from "../../stores";
import {
  deleteDetailCate,
  getAllDetailCategory,
} from "../../stores/slices/detailCategorySlice";
import DeleteModel from "../../modals/deleteModel";
import UpdateDetailCate from "../../modals/modal.update/updateDetailCate";

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const detailCategory = useSelector(
    (state: RootState) => state.detailCategory.listDetailCategory
  );
  const categories = useSelector(
    (state: RootState) => state.categories.listCategory
  );

  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [openModelUpdate, setOpenModelUpdate] = useState(false);
  const idDetailCate = useRef("");
  const detailCate = useRef(null);

  useEffect(() => {
    dispatch(getAllDetailCategory());
  }, [dispatch]);

  const handleOpenModelDelete = (id) => {
    setOpenModelDelete(true);
    idDetailCate.current = id;
  };

  const handleDeleteDetailCate = () => {
    dispatch(deleteDetailCate(idDetailCate.current));
  };

  const handleOpenModelUpdate = (value) => {
    setOpenModelUpdate(true);
    detailCate.current = value;
  };
  return (
    <>
      {detailCategory &&
        detailCategory.map((valDetail, ind) => (
          <tr key={ind}>
            <td>{valDetail.Ma}</td>
            <td>{valDetail.Ten}</td>
            <td>
              {categories.map((valCate) => {
                if (valDetail.MaLoai === valCate.Ma) return valCate.Ten;
                return "";
              })}
            </td>
            <td>
              <div className="wrapper-icon">
                <Link
                  to={`/admin/quan_ly/loai_san_pham/chi_tiet_loai/${valDetail._id}`}
                  className="icon bg-color-eye"
                  onClick={() => handleOpenModelUpdate(valDetail)}
                >
                  <IconIc24FillPencil color="lineTertiary" size={14} />
                </Link>
                <Link
                  className="icon bg-color-delete"
                  to={`/admin/quan_ly/loai_san_pham/chi_tiet_loai/${valDetail._id}`}
                  onClick={() => handleOpenModelDelete(valDetail._id)}
                >
                  <IconIc24FillArchiveBoxXmark color="lineTertiary" size={14} />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      <tr>
        <td>
          <div>
            {openModelDelete && (
              <DeleteModel
                openModel={openModelDelete}
                setOpenModel={setOpenModelDelete}
                onClickDelete={handleDeleteDetailCate}
                title="Xóa chi tiết loại sản phẩm"
                Placeholder={`Bạn có chắc chắn muốn xóa chi tiết loại sản phẩm có mã = ${idDetailCate.current} không?`}
                url="/admin/quan_ly/loai_san_pham"
              />
            )}
            {openModelUpdate && (
              <UpdateDetailCate
                openModel={openModelUpdate}
                setOpenModel={setOpenModelUpdate}
                title="Cập nhật chi tiết loại sản phẩm"
                url="/admin/quan_ly/loai_san_pham"
                detailCate={detailCate.current}
              />
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default CategoryDetail;
