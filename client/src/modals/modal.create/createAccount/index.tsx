import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IconIc24FillPhone,
  IconIc24FillUnlockCheck,
  IconIc24FillUnlock,
} from "@gapo_ui/icon";
import {
  Button,
  Checkbox,
  InputField,
  PasswordField,
} from "@gapo_ui/components";

import "./style.css";
import DefaultModel from "../../../layouts/admin/defaultModel";
import { RootState } from "../../../stores";
import {
  checkErrValidateForm,
  isEmpty,
  validateBirthday,
  validateFullName,
  validatePassword,
  validatePhone,
} from "../../../helpers/validator";
import { useInput } from "../../../hooks/useInput";
import { isPhoneExisted } from "../../../services/user.service";
import { clearMessage, setMessage } from "../../../stores/slices/messageSlice";
import { createAccount } from "../../../stores/slices/accountSlice";
import Uploader from "../../../components/Dropzone";
interface Props {
  setIsCreate: (val: boolean) => void;
}
const CreateAccount = ({ setIsCreate }: Props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.message);

  const phone = useInput("", validatePhone);
  const password = useInput("", validatePassword);
  const confirmPass = useInput("", isEmpty);
  const name = useInput("", validateFullName);
  const [birthday, setBirthday] = useState("");
  const [helper, setHelper] = useState("");
  const [isErrDate, setIsErrDate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);
  const handleBack = () => {
    navigator("/admin/quan_ly/tai_khoan");
    setIsCreate(false);
  };

  const handleCreateAccount = async () => {
    if (isErr() === false) {
      const res = await isPhoneExisted(phone.value);
      if (res.data.isPhone === false) dispatch(setMessage(res.data.message));
      else {
        dispatch(
          createAccount({
            phone: phone.value,
            password: password.value,
            name: name.value,
            birthday,
            isAdmin,
            avatar: avatarUrl,
            handleBack: () => {
              handleBack();
            },
          })
        );
        dispatch(clearMessage());
      }
    }
  };

  const onChangePhone = (e) => {
    phone.setValue(e.target.value);
  };
  const onChangeConfirmPass = (e: any) => {
    confirmPass.setValue(e.target.value);
  };
  const onChangePassword = (e: any) => {
    password.setValue(e.target.value);
  };
  const onChangeName = (e: any) => {
    name.setValue(e.target.value);
  };
  const onCheckBox = (e) => {
    setIsAdmin(e);
  };
  const onChangeBirth = (e: any) => {
    setBirthday(e.target.value);
  };

  const isErr = () => {
    return checkErrValidateForm(
      name.err(),
      phone.err(),
      password.err(),
      confirmPass.err(),
      errDatePicker()
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
  // console.log(avatarUrl);

  return (
    <DefaultModel onClickCancel={handleBack}>
      <div>
        <h3 className="title">Thêm mới tài khoản</h3>
        <div className="wrapper-avatar-account">
          <Uploader setAvatarUrl={setAvatarUrl} />
        </div>
        <div className="wrapper-create-acc">
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
            <PasswordField
              fullWidth
              label="Mật khẩu"
              placeholder="Mật khẩu"
              onChange={onChangePassword}
              value={password.value}
              helperText={password.helperText}
              error={password.isErr}
              leftItem={<IconIc24FillUnlock />}
            />
          </div>
          <div className="wrapper-input">
            <PasswordField
              fullWidth
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              onChange={onChangeConfirmPass}
              value={confirmPass.value}
              helperText={confirmPass.helperText}
              error={confirmPass.isErr}
              leftItem={<IconIc24FillUnlockCheck />}
            />
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
          <div className="wrapper-input checkbox">
            <Checkbox
              color="accentWorkPrimary"
              UNSAFE_style={{ cursor: "pointer" }}
              onChange={onCheckBox}
            >
              Quản lý
            </Checkbox>
          </div>
        </div>
        <div className="btn-create">
          <Button color="accentPrimary" onPress={handleCreateAccount}>
            Thêm Mới
          </Button>
        </div>
      </div>
    </DefaultModel>
  );
};

export default CreateAccount;
