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
              <th style={{textAlign: 'center'}}>Hóa đơn</th>
              <th style={{textAlign: 'center'}}>Khách hàng</th>
              <th style={{textAlign: 'center'}}>Ngày lập</th>
              <th style={{textAlign: 'center'}}>Người lập</th>
              <th style={{textAlign: 'center'}}>Tổng tiền</th>
              <th style={{textAlign: 'center'}}>Thanh toán</th>
              <th className="col-status" style={{textAlign: 'center'}}>Trạng thái</th>
              <th >Hủy đơn</th>
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
