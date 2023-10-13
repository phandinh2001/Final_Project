import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconIc24FillPencil } from "@gapo_ui/icon";
import { IconIc24FillArchiveBoxXmark } from "@gapo_ui/icon";

import { RootState } from "../../stores";
import {
  deleteCategory,
  getAllCategories,
} from "../../stores/slices/categorySlice";
import DeleteModel from "../../modals/deleteModel";
import UpdateCategory from "../../modals/modal.update/updateCategoryModel/idnex";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.listCategory
  );
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [openModelUpdate, setOpenModelUpdate] = useState(false);
  const idCate = useRef("");
  const name = useRef("");

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };
  const handleOpenModelDelete = (id) => {
    setOpenModelDelete(true);
    idCate.current = id;
  };
  const handleOpenModelUpdate = (cate) => {
    setOpenModelUpdate(true);
    idCate.current = cate._id;
    name.current = cate.Ten;
  };

  return (
    <>
      {categories &&
        categories.map((val, ind) => (
          <tr key={ind}>
            <td>{val.Ma}</td>
            <td>{val.Ten}</td>
            <td>
              <div className="wrapper-icon">
                <Link
                  to={`/admin/quan_ly/loai_san_pham/loai/${val._id}`}
                  className="icon bg-color-eye"
                  onClick={() => handleOpenModelUpdate(val)}
                >
                  <IconIc24FillPencil color="lineTertiary" size={14} />
                </Link>
                <Link
                  to={`/admin/quan_ly/loai_san_pham/loai/${val._id}`}
                  className="icon bg-color-delete"
                  onClick={() => handleOpenModelDelete(val._id)}
                >
                  <IconIc24FillArchiveBoxXmark color="lineTertiary" size={14} />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      <tr>
        <td>
          <div className="">
            {openModelDelete === true && (
              <DeleteModel
                openModel={openModelDelete}
                setOpenModel={setOpenModelDelete}
                onClickDelete={() => handleDeleteCategory(idCate.current)}
                title="Xóa loại sản phẩm"
                Placeholder={`Bạn có chắc chắn muốn xóa loại sản phẩm có mã = ${idCate.current} không?`}
                url="/admin/quan_ly/loai_san_pham"
              />
            )}
            {openModelUpdate === true && (
              <UpdateCategory
                openModel={openModelUpdate}
                setOpenModel={setOpenModelUpdate}
                id={idCate.current}
                title="Cập nhật loại sản phẩm"
                url="/admin/quan_ly/loai_san_pham"
                name={name.current}
              />
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default Category;
