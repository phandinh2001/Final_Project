import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, InputField } from "@gapo_ui/components";

import {
  checkErrValidateForm,
  validateFullName,
} from "../../../helpers/validator";
import { useInput } from "../../../hooks/useInput";
import DefaultModel from "../../../layouts/admin/defaultModel";
import { updateBrand } from "../../../stores/slices/brandSlice";

interface Props {
  setIsCreate: (val: boolean) => void;
  brand: any;
}
const UpdateBrand = ({ setIsCreate, brand }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useInput(brand.Ten, validateFullName);

  const handleBack = () => {
    setIsCreate(false);
    navigate("/admin/quan_ly/thuong_hieu");
  };
  const handleUpdateBrand = () => {
    if (isErr() === false) {
      dispatch(updateBrand({ id: brand._id, brand: { Ten: name.value } }));
      alert("Cập nhật thành công");
      handleBack();
    }
  };

  const onChangeName = (e: any) => {
    name.setValue(e.target.value);
  };
  const isErr = () => {
    return checkErrValidateForm(name.err());
  };
  return (
    <DefaultModel onClickCancel={handleBack}>
      <div>
        <h3 className="title">Cập nhật thương hiệu</h3>
        <div className="wrapper-create-Supplier">
          <div className="wrapper-input">
            <InputField fullWidth label="Mã" value={brand.Ma} disabled />
          </div>
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Tên thương hiệu"
              placeholder="Tên thương hiệu"
              value={name.value}
              helperText={name.helperText}
              error={name.isErr}
              onChange={onChangeName}
            />
          </div>
          <div className="btn-create-Supplier">
            <Button color="accentPrimary" onPress={handleUpdateBrand}>
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </DefaultModel>
  );
};

export default UpdateBrand;
