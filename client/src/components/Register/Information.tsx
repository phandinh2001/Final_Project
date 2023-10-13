import { InputField } from "@gapo_ui/components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import {
  checkErrValidateForm,
  validateBirthday,
  validateFullName,
} from "../../helpers/validator";
import { useDispatch } from "react-redux";
import { registerClient } from "../../stores/slices/userSlice";

interface Props {
  setIsLogin: (val: boolean) => void;
  infoRegister: any;
}
const Information = ({ setIsLogin, infoRegister }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameState = useInput("", validateFullName);
  const [birthday, setBirthday] = useState("");
  const [helper, setHelper] = useState("");
  const [isErrDate, setIsErrDate] = useState(false);

  const onChangeName = (e: any) => {
    nameState.setValue(e.target.value);
  };

  const onChangeBirth = (e: any) => {
    setBirthday(e.target.value);
  };

  const handleRegister = () => {
    if (isErr() === false) {
      dispatch(
        registerClient({
          name: nameState.value,
          phone: infoRegister.phone,
          password: infoRegister.password,
          birthday,
          navigate: () => {
            alert("Đăng ký thành công");
            setIsLogin(true);
            navigate("/login");
          },
        })
      );
    }
  };

  const isErr = () => {
    return checkErrValidateForm(nameState.err(), errDatePicker());
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
    <>
      <div className="wrapper-input">
        <InputField
          fullWidth
          placeholder="Họ và tên"
          value={nameState.value}
          helperText={nameState.helperText}
          error={nameState.isErr}
          onChange={onChangeName}
        />
      </div>
      <div className="wrapper-input">
        <InputField
          fullWidth
          type="date"
          value={birthday}
          helperText={helper}
          error={isErrDate}
          className="datePicker"
          onChange={onChangeBirth}
        />
      </div>
      <button type="button" className="btn" onClick={handleRegister}>
        Tiếp tục
      </button>
    </>
  );
};

export default Information;
