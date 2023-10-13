import React, { useState } from "react";

import "./style.css";
import AccountTBody from "../../../components.admin/AccountTBody";
import CreateAccount from "../../../modals/modal.create/createAccount";
import { useNavigate } from "react-router-dom";
import WrapperBody from "../../../layouts/admin/wrapperBody";

const Account = () => {
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();
  const handleOpenCreate = () => {
    setIsCreate(true);
    navigate("/admin/quan_ly/tai_khoan/them_moi");
  };
  return (
    <WrapperBody title="Danh sách tài khoản" onClickBtn={handleOpenCreate}>
      <>
        {isCreate && <CreateAccount setIsCreate={setIsCreate} />}
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Phân Quyền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AccountTBody />
          </tbody>
        </table>
      </>
    </WrapperBody>
  );
};

export default Account;
