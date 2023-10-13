import React, { useEffect, useState } from "react";
import Header from "../../components.client/Header";
import Footer from "../../components.client/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { convertNameToAvatar } from "../../helpers/avatarStr";

interface Props {
  children?: any;
}

const DefaultLayoutClient = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const [avtStr, setAvtStr] = useState<string>("");

  useEffect(() => {
    if (!user.avatar && user.username) {
      setAvtStr(() => convertNameToAvatar(user.username!));
    }
  }, [user.avatar, user.username]);
  return (
    <>
      <Header avtStr={avtStr} />
      {children}
      <Footer />
    </>
  );
};
export default DefaultLayoutClient;
