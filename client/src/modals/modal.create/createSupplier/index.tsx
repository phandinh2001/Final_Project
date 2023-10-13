import './style.css';

import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  InputField,
} from '@gapo_ui/components';

import {
  checkErrValidateForm,
  validateFullName,
  validatePhone,
} from '../../../helpers/validator';
import { useInput } from '../../../hooks/useInput';
import DefaultModel from '../../../layouts/admin/defaultModel';
import { createSupplier } from '../../../stores/slices/supplierSlice';

interface Props {
  setIsCreate: (val: boolean) => void;
}
const CreateSupplier = ({ setIsCreate }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useInput("", validateFullName);
  const phone = useInput("", validatePhone);
  const [address, setAddress] = useState("");

  const handleBack = () => {
    setIsCreate(false);
    navigate("/admin/quan_ly/nha_cung_cap");
  };
  const handleCreateSupplier = () => {
    if (isErr() === false) {
      dispatch(
        createSupplier({
          Ten: name.value,
          SDT: phone.value,
          DiaChi: address,
        })
      );
      alert("Thêm nhà cung cấp thành công");
      handleBack();
    }
  };

  const onChangeName = (e: any) => {
    name.setValue(e.target.value);
  };
  const onChangePhone = (e) => {
    phone.setValue(e.target.value);
  };
  const onChangAddress = (e) => {
    setAddress(e.target.value);
  };
  const isErr = () => {
    return checkErrValidateForm(name.err(), phone.err());
  };
  return (
    <DefaultModel onClickCancel={handleBack}>
      <div>
        <h3 className="title">Thêm mới Nhà cung cấp</h3>
        <div className="wrapper-create-Supplier">
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Tên nhà cung cấp"
              placeholder="Tên nhà cung cấp"
              value={name.value}
              helperText={name.helperText}
              error={name.isErr}
              onChange={onChangeName}
            />
          </div>
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Số điện thoại"
              placeholder="Số điện thoại"
              value={phone.value}
              helperText={phone.helperText}
              error={phone.isErr}
              onChange={onChangePhone}
            />
          </div>
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Địa chỉ"
              placeholder="Địa chỉ"
              onChange={onChangAddress}
            />
          </div>
          <div className="btn-create-Supplier">
            <Button color="accentPrimary" onPress={handleCreateSupplier}>
              Thêm Mới
            </Button>
          </div>
        </div>
      </div>
    </DefaultModel>
  );
};

export default CreateSupplier;
