import React, { useState, useEffect } from "react";
import Banner from "../../../components.client/Banner/Banner";
import Uploader from "../../../components/Dropzone";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { updateAvatarByPhone } from "../../../stores/slices/userSlice";

import "./style.css";
import { getClientItemByPhone } from "../../../stores/slices/clientSlice";
import UpdatePassword from "../../../components/UpdatePassword";
import UpdateInfoClient from "../../../components.client/UpdateInfoClient";

const Setting = () => {
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const { clientItem } = useSelector((state: RootState) => state.clients);
  useEffect(() => {
    dispatch(getClientItemByPhone(user.phone));
  }, [dispatch, user.phone]);

  useEffect(() => {
    if (avatarUrl)
      dispatch(updateAvatarByPhone({ SDT: user.phone, Anh: avatarUrl }));
  }, [avatarUrl, dispatch, user.phone]);

  const handleClearAvatar = () => {
    const isClear = window.confirm("Bạn có muốn xóa ảnh đại diện không");
    if (isClear) {
      dispatch(updateAvatarByPhone({ SDT: user.phone, Anh: "" }));
    }
  };

  return (
    <div>
      <Banner title="Cài đặt" bread="Thông tin cá nhân" />
      <section className="ftco-section ">
        <div className="container">
          <div>
            <div className="wrapper-avatar-account wrapper-avatar-client">
              <Uploader
                setAvatarUrl={setAvatarUrl}
                size={150}
                avatar={
                  user.avatar ? user.avatar : `/assets/avatar.img/avatar.jpg`
                }
              />
              <div className="clear-avatar" onClick={handleClearAvatar}>
                Xóa ảnh đại diện
              </div>
            </div>
            {clientItem && <UpdateInfoClient client={clientItem} />}
            <UpdatePassword phone={user.phone} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Setting;
