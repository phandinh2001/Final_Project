import React, { useState, useEffect } from "react";
import WrapperBody from "../../../layouts/admin/wrapperBody";
import Uploader from "../../../components/Dropzone";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { getAdminItemByPhone } from "../../../stores/slices/adminSlice";

import "./style.css";
import UpdatePassword from "../../../components/UpdatePassword";
import UpdateInformation from "../../../components.admin/UpdateInformation";
import { updateAvatarByPhone } from "../../../stores/slices/userSlice";
const Information = () => {
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const { adminItem } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(getAdminItemByPhone(user.phone));
  }, [dispatch, user.phone]);
  useEffect(() => {
    if (avatarUrl)
      dispatch(updateAvatarByPhone({ SDT: user.phone, Anh: avatarUrl }));
  }, [avatarUrl, dispatch, user.phone]);
  const handleClearAvatar = () => {
    const isClear = window.confirm("Bạn có muốn xóa ảnh đại diện không");
    if (isClear) {
      dispatch(updateAvatarByPhone({ SDT: user.phone, Anh: "" }));
      setAvatarUrl("");
    }
  };
  return (
    <WrapperBody isBtn={false}>
      <div>
        <div className="wrapper-avatar-account wrapper-avatar-client">
          <Uploader
            setAvatarUrl={setAvatarUrl}
            size={150}
            avatar={user.avatar ? user.avatar : `/assets/avatar.img/avatar.jpg`}
          />
          <div className="clear-avatar" onClick={handleClearAvatar}>
            Xóa ảnh đại diện
          </div>
        </div>
        {adminItem && <UpdateInformation admin={adminItem} />}
        <UpdatePassword phone={user.phone} />
      </div>
    </WrapperBody>
  );
};

export default Information;
