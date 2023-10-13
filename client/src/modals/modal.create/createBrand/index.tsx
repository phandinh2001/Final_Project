import "./style.css";

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
import { createBrand } from "../../../stores/slices/brandSlice";

interface Props {
  setIsCreate: (val: boolean) => void;
}
const CreateBrand = ({ setIsCreate }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useInput("", validateFullName);

  const handleBack = () => {
    setIsCreate(false);
    navigate("/admin/quan_ly/thuong_hieu");
  };
  const handleCreateBrand = () => {
    if (isErr() === false) {
      dispatch(createBrand({ Ten: name.value }));
      alert("thêm mới thành công");
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
        <h3 className="title">Thêm mới thương hiệu</h3>
        <div className="wrapper-create-brand">
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
            <Button color="accentPrimary" onPress={handleCreateBrand}>
              Thêm Mới
            </Button>
          </div>
        </div>
      </div>
    </DefaultModel>
  );
};

export default CreateBrand;
