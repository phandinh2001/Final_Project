import React, { useState } from "react";
import WrapperBody from "../../../layouts/admin/wrapperBody";
import CreateBillImport from "../../../modals/modal.create/createBillImport";
import BillImportTBody from "../../../components.admin/BillImportTBody";

const BillImport = () => {
  const [isCreate, setIsCreate] = useState(false);
  const handleAddBillImport = () => {
    setIsCreate(true);
  };
  return (
    <WrapperBody
      title="Danh sách hóa đơn nhập"
      onClickBtn={handleAddBillImport}
    >
      <div>
        {isCreate && <CreateBillImport setIsCreate={setIsCreate} />}
        <table>
          <thead>
            <tr>
              <th>hóa đơn</th>
              <th>NCC</th>
              <th>Ngày lập</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th className="col-status">Trạng thái</th>
              <th>Hủy đơn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <BillImportTBody />
          </tbody>
        </table>
      </div>
    </WrapperBody>
  );
};

export default BillImport;
