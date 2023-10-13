import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import { RootState } from "../../stores";
import {
  getAllAccounts,
  updateAccount,
} from "../../stores/slices/accountSlice";
import { convertIsAdmin } from "../../helpers/convert";
import { Avatar } from "@gapo_ui/components";
import { convertNameToAvatar } from "../../helpers/avatarStr";
const AccountTBody = () => {
  const dispatch = useDispatch();
  const { listAccount } = useSelector((state: RootState) => state.accounts);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getAllAccounts());
  }, [dispatch]);

  const handleLockAccount = (id, isClose) => {
    dispatch(updateAccount({ id, isClose: !isClose }));
  };
  return (
    <>
      {listAccount &&
        listAccount.map((acc, ind) => {
          return (
            <tr key={ind}>
              <td height={50} width={60}>
                {acc.Anh ? (
                  <Avatar
                    src={`${acc.Anh}`}
                    size={40}
                    alt="icon-80"
                  />
                ) : (
                  <Avatar size={40} UNSAFE_style={{ background: "#00b3f4" }}>
                    {convertNameToAvatar(acc.Ten)}
                  </Avatar>
                )}
              </td>
              <td>{acc.Ten}</td>
              <td>{acc.SDT}</td>
              <td>{new Date(acc.NgaySinh).toLocaleDateString()}</td>
              <td>{convertIsAdmin(acc.PhanQuyen)}</td>
              <td>
                {user.phone !== acc.SDT ? (
                  acc.KhoaTK === false ? (
                    <div
                      className="lock-up-account"
                      onDoubleClick={() => handleLockAccount(acc._id, acc.KhoaTK)}
                    >
                      Khóa
                    </div>
                  ) : (
                    <div
                      className="open-account"
                      onDoubleClick={() => handleLockAccount(acc._id, acc.KhoaTK)}
                    >
                      Mở khóa
                    </div>
                  )
                ) : (
                  ""
                )}
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default AccountTBody;
