import React, { useState, useEffect } from "react";
import Social from "../Social";

import "./style.css";
import Phone from "./Phone";
import Password from "./Password";
import Information from "./Information";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../stores/slices/messageSlice";
interface Props {
  isLogin: boolean;
  setIsLogin: (val: boolean) => void;
}
const Register = ({ isLogin, setIsLogin }: Props) => {
  const [isPhone, setIsPhone] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [infoRegister, setInfoRegister] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogin === false) {
      setIsPhone(true);
      setIsPassword(true);
      dispatch(clearMessage());
    }
  }, [dispatch, isLogin]);
  return (
    <form>
      <h3>Tạo tài khoản</h3>
      <Social />
      {isPhone ? (
        <Phone
          isLogin={isLogin}
          setIsPhone={setIsPhone}
          setInfoRegister={setInfoRegister}
        />
      ) : isPassword ? (
        <Password
          setIsPassword={setIsPassword}
          setInfoRegister={setInfoRegister}
        />
      ) : (
        <Information setIsLogin={setIsLogin} infoRegister={infoRegister} />
      )}
    </form>
  );
};

export default Register;
