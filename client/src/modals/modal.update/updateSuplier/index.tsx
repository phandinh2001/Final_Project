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
import { updateSupplier } from '../../../stores/slices/supplierSlice';

interface Props {
  setIsCreate: (val: boolean) => void;
  supplier: any;
}
const UpdateSupplier = ({ setIsCreate, supplier }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useInput(supplier.Ten, validateFullName);
  const phone = useInput(supplier.SDT, validatePhone);
  const [address, setAddress] = useState(supplier.DiaChi);

  const handleBack = () => {
    setIsCreate(false);
    navigate("/admin/quan_ly/nha_cung_cap");
  };
  const handleUpdateSupplier = () => {
    if (isErr() === false) {
      dispatch(
        updateSupplier({
          id: supplier._id,
          supplier: {
            Ten: name.value,
            SDT: phone.value,
            DiaChi: address,
          },
        })
      );
      alert("Cập nhật thành công");
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
        <h3 className="title">Cập nhật Nhà cung cấp</h3>
        <div className="wrapper-create-Supplier">
          <div className="wrapper-input">
            <InputField fullWidth label="Mã" value={supplier.Ma} disabled />
          </div>
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
              defaultValue={address}
              onChange={onChangAddress}
            />
          </div>
          <div className="btn-create-Supplier">
            <Button color="accentPrimary" onPress={handleUpdateSupplier}>
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </DefaultModel>
  );
};

export default UpdateSupplier;
