/* eslint-disable react-hooks/exhaustive-deps */
import { InputField, PasswordField } from "@gapo_ui/components";
import React, { useEffect } from "react";
import { IconIc24FillPhone } from "@gapo_ui/icon";
import { IconIc24FillUnlock } from "@gapo_ui/icon";

import Social from "../Social";
import "./style.css";
import { useInput } from "../../hooks/useInput";
import {
  checkErrValidateForm,
  validatePassword,
  validatePhone,
} from "../../helpers/validator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../stores/slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { clearMessage } from "../../stores/slices/messageSlice";
interface Props {
  isLogin: boolean;
}
const Login = ({ isLogin }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state: RootState) => state.message);
  const phoneState = useInput("", validatePhone);
  const passwordState = useInput("", validatePassword);
  useEffect(() => {
    if (isLogin === false) {
      phoneState.reset();
      passwordState.reset();
    }
  }, [isLogin]);

  const onChangePhone = (e: any) => {
    phoneState.setValue(e.target.value);
  };
  const onChangePassword = (e: any) => {
    passwordState.setValue(e.target.value);
  };

  const handleLogin = () => {
    if (isErr() === false) {
      dispatch(
        login({
          phone: phoneState.value,
          password: passwordState.value,
          success: (url: string): void => {
            navigate(url);
          },
        })
      );
    } else {
      dispatch(clearMessage());
    }
  };

  const isErr = () => {
    return checkErrValidateForm(phoneState.err(), passwordState.err());
  };
  return (
    <form className="form-login">
      <h3>Đăng nhập</h3>
      <Social />
      <div className="wrapper-input">
        <InputField
          fullWidth
          placeholder="Số điện thoại"
          onChange={onChangePhone}
          value={phoneState.value}
          helperText={phoneState.helperText}
          error={phoneState.isErr}
          leftItem={<IconIc24FillPhone />}
        />
      </div>
      <div className="wrapper-input">
        <PasswordField
          fullWidth
          placeholder="Mật khẩu"
          onChange={onChangePassword}
          value={passwordState.value}
          helperText={passwordState.helperText}
          error={passwordState.isErr}
          leftItem={<IconIc24FillUnlock />}
        />
      </div>
      <div className="message">{message}</div>
      <button type="button" className="btn" onClick={handleLogin}>
        Đăng nhập
      </button>
      <div className="forgot-password">Quên mật khẩu?</div>
    </form>
  );
};

export default Login;
