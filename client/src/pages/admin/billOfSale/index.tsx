import React, { useState } from "react";
import WrapperBody from "../../../layouts/admin/wrapperBody";
import { useNavigate } from "react-router-dom";
import BillOfSaleTBody from "../../../components.admin/BillOfSaleTBody";
import "./style.css";
import CreateBillOfSale from "../../../modals/modal.create/createBillOfSale";
const BillOfSale = () => {
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();
  const handleOpenCreate = () => {
    setIsCreate(true);
    navigate("/admin/quan_ly/hoa_don_ban/them_moi");
  };

  return (
    <WrapperBody title="Danh sách hóa đơn bán" onClickBtn={handleOpenCreate}>
      <div>
        {isCreate && <CreateBillOfSale setIsCreate={setIsCreate} />}
        <table>
          <thead>
            <tr>
              <th>hóa đơn</th>
              <th>khách hàng</th>
              <th>Ngày lập</th>
              <th>Người lập</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th className="col-status">Trạng thái</th>
              <th>Hủy đơn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <BillOfSaleTBody />
          </tbody>
        </table>
      </div>
    </WrapperBody>
  );
};

export default BillOfSale;
