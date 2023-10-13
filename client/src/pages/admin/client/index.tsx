import React, { useState } from "react";

import "./style.css";
import { useNavigate } from "react-router-dom";
import ClientTBody from "../../../components.admin/ClientTBody";
import CreateClient from "../../../modals/modal.create/createClient";
import WrapperBody from "../../../layouts/admin/wrapperBody";
const Client = () => {
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();
  const handleOpenCreate = () => {
    setIsCreate(true);
    navigate("/admin/quan_ly/khach_hang/them_moi");
  };
  return (
    <WrapperBody title="Danh sách khách hàng" onClickBtn={handleOpenCreate}>
      <>
        {isCreate && (
          <CreateClient
            setIsCreate={setIsCreate}
            navigateUrl="/admin/quan_ly/khach_hang"
          />
        )}
        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th style={{ width: "100px" }}></th>
            </tr>
          </thead>
          <tbody>
            <ClientTBody />
          </tbody>
        </table>
      </>
    </WrapperBody>
  );
};

export default Client;
