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
              <th style={{textAlign: 'center'}}>Họ và tên</th>
              <th style={{textAlign: 'center'}}>Số điện thoại</th>
              <th style={{textAlign: 'center'}}>Ngày sinh</th>
              <th style={{textAlign: 'center'}}>Phân Quyền</th>
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
