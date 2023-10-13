import React, { useState, useEffect } from "react";
import Header from "../../../components.admin/Header";
import Menu from "../../../components.admin/Menu";

import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import PathName from "../../../components.admin/PathName";
import { convertNameToAvatar } from "../../../helpers/avatarStr";

interface Props {
  children?: any;
}
const DefaultLayoutAdmin = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const [avtStr, setAvtStr] = useState<string>("");

  useEffect(() => {
    if (!user.avatar && user.username) {
      setAvtStr(() => convertNameToAvatar(user.username!));
    }
  }, [user.avatar, user.username]);
  return (
    <div className="wrapper-layout">
      <div className="right">
        <Header avtStr={avtStr} />
        <PathName />
        {children}
      </div>
      <Menu avtStr={avtStr} />
    </div>
  );
};

export default DefaultLayoutAdmin;
