import { PasswordField } from "@gapo_ui/components";
import React from "react";
import { IconIc24FillUnlock } from "@gapo_ui/icon";
import { IconIc24FillUnlockCheck } from "@gapo_ui/icon";

import { useInput } from "../../hooks/useInput";
import {
  checkErrValidateForm,
  isEmpty,
  validatePassword,
} from "../../helpers/validator";
interface Props {
  setIsPassword: (val: boolean) => void;
  setInfoRegister: (val: any) => void;
}
const Password = ({ setIsPassword ,setInfoRegister}: Props): JSX.Element => {
  const password = useInput("", validatePassword);
  const confirmPass = useInput("", isEmpty);

  const onChangeConfirmPass = (e: any) => {
    confirmPass.setValue(e.target.value);
  };
  const onChangePassword = (e: any) => {
    password.setValue(e.target.value);
  };
  const handleSubmitPassword = () => {
    if (isErr() === false) {
      if (confirmPass.value !== password.value) {
        confirmPass.setHelperText("mật khẩu không trùng khớp");
        confirmPass.setIsErr(true);
      } else {
        setIsPassword(false);
        setInfoRegister((prev: any) => ({ ...prev, password: password.value }));
      }
    }
  };

  const isErr = () => {
    return checkErrValidateForm(password.err(), confirmPass.err());
  };
  return (
    <>
      <div className="wrapper-input">
        <PasswordField
          fullWidth
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
          placeholder="Nhập lại mật khẩu"
          onChange={onChangeConfirmPass}
          value={confirmPass.value}
          helperText={confirmPass.helperText}
          error={confirmPass.isErr}
          leftItem={<IconIc24FillUnlockCheck />}
        />
      </div>
      <button type="button" className="btn" onClick={handleSubmitPassword}>
        Tiếp tục
      </button>
    </>
  );
};

export default Password;
