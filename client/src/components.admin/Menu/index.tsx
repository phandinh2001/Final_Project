import React from "react";
import { IconIc24FillLock } from "@gapo_ui/icon";
import { IconIc24FillArrowheadLeft } from "@gapo_ui/icon";

import "./style.css";
import ItemMenu from "./ItemMenu/ItemMenu";
import { listItem } from "./config/config";
import Manage from "../Manage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/slices/userSlice";
interface Props {
  avtStr: string;
}
const Menu = ({ avtStr }: Props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleNavigator = (url: string) => {
    navigator(url);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigator("/login");
  };
  return (
    <div className="wrapper-menu">
      <div className="logo">Admin Store</div>
      <div className="menu-bottom">
        <div className="wrapper-item">
          {listItem.map((item, index) => {
            if (item.children === "Quản lý")
              return (
                <Manage
                  key={index}
                  children={item.children}
                  iconLeft={<item.icon color="lineSecondary" />}
                  iconRight={
                    <IconIc24FillArrowheadLeft color="lineSecondary" />
                  }
                  className="item"
                  onClick={() => {}}
                />
              );
            else
              return (
                <ItemMenu
                  key={index}
                  iconLeft={<item.icon color="lineSecondary" />}
                  className="item"
                  onClick={() => {
                    handleNavigator(item.url);
                  }}
                  children={item.children}
                />
              );
          })}
          <div className="line"></div>
          <div className="">
            <ItemMenu
              iconLeft={<IconIc24FillLock color="lineSecondary" />}
              className="item"
              onClick={handleLogout}
              children={"Đăng xuất"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
