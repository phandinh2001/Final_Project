import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IconIc24FillArchiveBoxXmark, IconIc24FillPencil } from "@gapo_ui/icon";

import DeleteModel from "../../modals/deleteModel";
import { RootState } from "../../stores";
import { deleteBrand, getAllBrands } from "../../stores/slices/brandSlice";
import UpdateBrand from "../../modals/modal.update/updateBrand";

const BrandTBody = () => {
  const dispatch = useDispatch();
  const { listBrand } = useSelector((state: RootState) => state.brands);

  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [openModelUpdate, setOpenModelUpdate] = useState(false);
  const idBrand = useRef("");
  const brandItem = useRef("");

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const handleDeleteBrand = (id) => {
    dispatch(deleteBrand(id));
  };
  const handleOpenModelDelete = (id) => {
    idBrand.current = id;
    setOpenModelDelete(true);
  };
  const handleOpenModelUpdate = (sup) => {
    brandItem.current = sup;
    setOpenModelUpdate(true);
  };
  return (
    <>
      {listBrand &&
        listBrand.map((brand, ind) => (
          <tr key={ind}>
            <td>{brand.Ma}</td>
            <td>{brand.Ten}</td>
            <td>
              <div className="wrapper-icon">
                <Link
                  to={`/admin/quan_ly/thuong_hieu/${brand._id}`}
                  className="icon bg-color-eye"
                  onClick={() => handleOpenModelUpdate(brand)}
                >
                  <IconIc24FillPencil color="lineTertiary" size={14} />
                </Link>
                <Link
                  to={`/admin/quan_ly/thuong_hieu/${brand._id}`}
                  className="icon bg-color-delete"
                  onClick={() => handleOpenModelDelete(brand._id)}
                >
                  <IconIc24FillArchiveBoxXmark color="lineTertiary" size={14} />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      <tr>
        <td>
          {openModelDelete === true && (
            <DeleteModel
              openModel={openModelDelete}
              setOpenModel={setOpenModelDelete}
              onClickDelete={() => handleDeleteBrand(idBrand.current)}
              title="Xóa loại sản phẩm"
              Placeholder={`Bạn có chắc chắn muốn xóa Nhà cung cấp có mã = ${idBrand.current} không?`}
              url="/admin/quan_ly/thuong_hieu"
            />
          )}
          {openModelUpdate && (
            <UpdateBrand
              setIsCreate={setOpenModelUpdate}
              brand={brandItem.current}
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default BrandTBody;
