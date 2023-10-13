import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconIc24FillPhone } from "@gapo_ui/icon";
import { Button, InputField } from "@gapo_ui/components";

import "./style.css";
import DefaultModel from "../../../layouts/admin/defaultModel";
import { RootState } from "../../../stores";
import {
  checkErrValidateForm,
  validateBirthday,
  validateEmail,
  validateFullName,
  validatePhone,
} from "../../../helpers/validator";
import { useInput } from "../../../hooks/useInput";
import { clearMessage } from "../../../stores/slices/messageSlice";
import { createClient } from "../../../stores/slices/clientSlice";
interface Props {
  setIsCreate: (val: boolean) => void;
  navigateUrl?: string;
  handleCreateSuccess?: (val: any) => void;
}
const CreateClient = ({ setIsCreate, navigateUrl = "" }: Props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.message);

  const phone = useInput("", validatePhone);
  const name = useInput("", validateFullName);
  const email = useInput("", validateEmail);
  const [sex, setSex] = useState("nam");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [helper, setHelper] = useState("");
  const [isErrDate, setIsErrDate] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);
  const handleBack = () => {
    navigator(navigateUrl);
    setIsCreate(false);
  };

  const handleCreateAccount = async () => {
    if (isErr() === false) {
      dispatch(
        createClient({
          name: name.value,
          phone: phone.value,
          email: email.value,
          sex,
          birthday,
          address,
          handleBack: () => {
            handleBack();
          },
        })
      );
      dispatch(clearMessage());
    }
  };

  const onChangePhone = (e) => {
    phone.setValue(e.target.value);
  };
  const onChangeName = (e: any) => {
    name.setValue(e.target.value);
  };

  const onChangeBirth = (e: any) => {
    setBirthday(e.target.value);
  };
  const onChangeSex = (e) => {
    setSex(e.target.value);
  };
  const onChangAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangeEmail = (e) => {
    email.setValue(e.target.value);
  };
  const isErr = () => {
    return checkErrValidateForm(
      name.err(),
      phone.err(),
      errDatePicker(),
      email.err()
    );
  };

  const errDatePicker = () => {
    const { errText, isErr } = validateBirthday(
      new Date(birthday).toLocaleDateString()
    );
    setHelper(errText);
    setIsErrDate(isErr);
    return isErr;
  };
  return (
    <DefaultModel onClickCancel={handleBack}>
      <div>
        <h3 className="title">Thêm mới khách hàng</h3>
        <div className="wrapper-create-client">
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Họ và Tên"
              placeholder="Họ và tên"
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
              leftItem={<IconIc24FillPhone />}
              value={phone.value}
              helperText={phone.helperText}
              error={phone.isErr}
              onChange={onChangePhone}
            />
            <div className="message">{message}</div>
          </div>
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Email"
              placeholder="Email"
              leftItem={<IconIc24FillPhone />}
              value={email.value}
              helperText={email.helperText}
              error={email.isErr}
              onChange={onChangeEmail}
            />
          </div>
          <div className="wrapper-input">
            <label className="title-select">Giới tính:</label>
            <br />
            <select className="select-sex" onChange={onChangeSex}>
              <option value={"nam"}>Nam</option>
              <option value={"nu"}>Nữ</option>
            </select>
          </div>
          <div className="wrapper-input">
            <InputField
              fullWidth
              label="Ngày sinh"
              type="date"
              value={birthday}
              helperText={helper}
              error={isErrDate}
              className="datePicker"
              onChange={onChangeBirth}
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
        </div>
        <div className="btn-create-client">
          <Button color="accentPrimary" onPress={handleCreateAccount}>
            Thêm Mới
          </Button>
        </div>
      </div>
    </DefaultModel>
  );
};

export default CreateClient;
