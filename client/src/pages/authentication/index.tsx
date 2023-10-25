import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "./style.css";
import Login from "../../components/Login";
import Register from "../../components/Register";

const Authentication = () => {
  const [styleContainer, setStyleContainer] = useState("");
  const [isLogIn, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogIn) setStyleContainer("");
    else setStyleContainer("right-panel-active");
  }, [isLogIn]);
  const handleSignUp = () => {
    setIsLogin(false);
    navigate("/register");
  };
  const handleSignIn = () => {
    setIsLogin(true);
    navigate("/login");
  };
  const user = JSON.parse(localStorage.getItem("user")!);
  if (user) {
    if (user.position === "QuanLy") return <Navigate to={"/admin"} />;
    else return <Navigate to={"/"} />;
  }
  const handleToShop = () => {
    navigate("/");
  };
  return (
    <div className="wrapper-auth">
      <div className={`container ${styleContainer}`} id="container">
        <div className="form-container sign-up-container">
          <Register isLogin={isLogIn} setIsLogin={setIsLogin} />
        </div>
        <div className="form-container sign-in-container">
          <Login isLogin={isLogIn} />
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="title-website" onClick={handleToShop} >
                DPV
              </div>
              <h3>Chào mừng trở lại!</h3>
              <p>
                Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin
                cá nhân của bạn
              </p>
              <button
                className="ghost btn"
                id="signIn"
                type="button"
                onClick={handleSignIn}
              >
                Đăng nhập
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <div className="title-website" onClick={handleToShop}>
                DPV
              </div>
              <h3>Chào bạn!</h3>
              <p>
                Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng
                tôi
              </p>
              <button
                className="ghost btn"
                id="signUp"
                type="button"
                onClick={handleSignUp}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
