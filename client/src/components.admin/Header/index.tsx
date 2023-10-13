import React, { useState } from "react";
import { Avatar, SearchField } from "@gapo_ui/components";
import { IoMdSettings } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { IconIc24FillArrowheadDown } from "@gapo_ui/icon";

import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/slices/userSlice";
type Props = {
  avtStr: string;
};
const Header = ({ avtStr }: Props): JSX.Element => {
  const [disable, setDisable] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEventDisplay = () => {
    setDisable((prev) => {
      return prev ? false : true;
    });
  };
  const handleSetting = () => {
    navigate("/admin/ho_so");
    setDisable((prev) => {
      return prev ? false : true;
    });
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setDisable((prev) => {
      return prev ? false : true;
    });
  };
  return (
    <div className="wrapper-header">
      {/* <SearchField border="rounded" placeholder="Tìm kiếm" /> */}
      <div></div>
      <div className="wrapper-header-right">
        <span>Xin chào!</span>
        <span className="name"> {user.username}</span>
        <div className={"avatar"} onClick={handleEventDisplay}>
          {user.avatar ? (
            <Avatar src={user.avatar} size={32} alt="icon-80" />
          ) : (
            <Avatar size={32} UNSAFE_style={{ background: "#00b3f4" }}>
              {avtStr}
            </Avatar>
          )}
        </div>
        <div onClick={handleEventDisplay}>
          <IconIc24FillArrowheadDown
            UNSAFE_style={{ marginTop: "5px", cursor: "pointer" }}
          />
        </div>
        {disable && (
          <div className="user">
            <div className="setting" onClick={handleSetting}>
              <IoMdSettings size={20} />
              <span>Cài đặt</span>
            </div>
            <div className="line" />
            <div className="signUp" onClick={handleLogout}>
              <BiLogIn size={20} />
              <span>Đăng xuất</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
