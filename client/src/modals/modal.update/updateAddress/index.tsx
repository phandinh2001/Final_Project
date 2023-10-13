import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputField } from "@gapo_ui/components";

import {
  checkErrValidateForm,
  isEmpty,
  validateFullName,
  validatePhone,
} from "../../../helpers/validator";
import { useInput } from "../../../hooks/useInput";
import DefaultModel from "../../../layouts/admin/defaultModel";

interface Props {
  setIsCreate: (val: boolean) => void;
  setName: (val: string) => void;
  setPhone: (val: string) => void;
  setAddress: (val: string) => void;
  setNote: (val: string) => void;
  name: string;
  phone: string;
  address: string;
  note: string;
  navigate:string
}
const UpdateAddress = (props: Props) => {
  const { setIsCreate } = props;
  const navigate = useNavigate();

  const nameInput = useInput(props.name, validateFullName);
  const phoneInput = useInput(props.phone, validatePhone);
  const addressInput = useInput(props.address, isEmpty);
  const noteInput = useInput(props.note);

  const handleBack = () => {
    setIsCreate(false);
    // navigate("/admin/quan_ly/hoa_don_ban/them_moi");
    navigate(props.navigate)
  };
  const handleUpdateAddress = () => {
    if (isErr() === false) {
      props.setName(nameInput.value);
      props.setPhone(phoneInput.value);
      props.setAddress(addressInput.value);
      props.setNote(noteInput.value);
      alert("cập nhật thành công");
      handleBack();
    }
  };

  const onChangeName = (e: any) => {
    nameInput.setValue(e.target.value);
  };
  const onChangePhone = (e: any) => {
    phoneInput.setValue(e.target.value);
  };
  const onChangeAddress = (e: any) => {
    addressInput.setValue(e.target.value);
  };
  const onChangeNote = (e: any) => {
    noteInput.setValue(e.target.value);
  };
  const isErr = () => {
    return checkErrValidateForm(
      nameInput.err(),
      phoneInput.err(),
      addressInput.err()
    );
  };
  return (
    <DefaultModel onClickCancel={handleBack}>
      <div>
        <h3 className="title">Cập nhật địa chỉ</h3>
        <div className="wrapper-create-Supplier">
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Tên người nhận hàng"
              placeholder="Họ và tên"
              value={nameInput.value}
              helperText={nameInput.helperText}
              error={nameInput.isErr}
              onChange={onChangeName}
            />
          </div>
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Số điện thoại người nhận hàng"
              placeholder="Số điện thoại"
              value={phoneInput.value}
              helperText={phoneInput.helperText}
              error={phoneInput.isErr}
              onChange={onChangePhone}
            />
          </div>
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Địa chỉ nhận hàng"
              placeholder="Địa chỉ"
              value={addressInput.value}
              helperText={addressInput.helperText}
              error={addressInput.isErr}
              onChange={onChangeAddress}
            />
          </div>
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Ghi chú"
              placeholder="Ghi Chú"
              value={noteInput.value}
              helperText={noteInput.helperText}
              error={noteInput.isErr}
              onChange={onChangeNote}
            />
          </div>
          <div className="btn-create-Supplier">
            <Button color="accentPrimary" onPress={handleUpdateAddress}>
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </DefaultModel>
  );
};

export default UpdateAddress;
