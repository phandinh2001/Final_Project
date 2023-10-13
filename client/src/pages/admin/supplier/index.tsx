import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import SupplierTBody from '../../../components.admin/SupplierTBody';
import WrapperBody from '../../../layouts/admin/wrapperBody';
import CreateSupplier from '../../../modals/modal.create/createSupplier';

const Supplier = () => {
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();
  const handleOpenCreate = () => {
    setIsCreate(true);
    navigate("/admin/quan_ly/nha_cung_cap/them_moi");
  };
  return (
    <WrapperBody title="Danh sách nhà cung cấp" onClickBtn={handleOpenCreate}>
      <div>
        {isCreate && <CreateSupplier setIsCreate={setIsCreate} />}
        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên công ty</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th style={{ width: "100px" }}></th>
            </tr>
          </thead>
          <tbody>
            <SupplierTBody />
          </tbody>
        </table>
      </div>
    </WrapperBody>
  );
};

export default Supplier;
