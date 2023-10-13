/* eslint-disable react-hooks/exhaustive-deps */
import { InputField } from "@gapo_ui/components";
import React, { useEffect } from "react";
import { IconIc24FillPhone } from "@gapo_ui/icon";
import { useInput } from "../../hooks/useInput";
import { validatePhone } from "../../helpers/validator";
import { isPhoneExisted } from "../../services/user.service";
import { useDispatch } from "react-redux";
import { clearMessage, setMessage } from "../../stores/slices/messageSlice";
import { RootState } from "../../stores";
import { useSelector } from "react-redux";

interface Props {
  isLogin?: boolean;
  setIsPhone?: (val: boolean) => void;
  setInfoRegister?: (val: any) => void;
}

const Phone = ({
  isLogin = true,
  setIsPhone = (val: any) => {},
  setInfoRegister = (val: any) => {},
}: Props): JSX.Element => {
  const phoneState = useInput("", validatePhone);
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.message);

  useEffect(() => {
    if (isLogin) {
      dispatch(clearMessage());
      phoneState.reset();
    }
  }, [dispatch, isLogin]);

  const onChangePhone = (e: any) => {
    phoneState.setValue(e.target.value);
  };

  const handleSubmitPhone = async () => {
    if (phoneState.err() === false) {
      const res = await isPhoneExisted(phoneState.value);
      if (res.data.isPhone === false) dispatch(setMessage(res.data.message));
      else {
        dispatch(clearMessage());
        setInfoRegister((prev: any) => ({ ...prev, phone: phoneState.value }));
        setIsPhone(false);
      }
    } else dispatch(clearMessage());
  };
  return (
    <>
      <div className="wrapper-input">
        <InputField
          fullWidth
          placeholder="Số điện thoại"
          value={phoneState.value}
          helperText={phoneState.helperText}
          error={phoneState.isErr}
          leftItem={<IconIc24FillPhone />}
          onChange={onChangePhone}
        />
      </div>
      <div className="message">{message}</div>
      <button type="button" className="btn" onClick={handleSubmitPhone}>
        Tiếp tục
      </button>
    </>
  );
};

export default Phone;
