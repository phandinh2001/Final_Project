import React from "react";
import { Modal, Button } from "rsuite";

import "./style.css";
import { convertSex } from "../../helpers/convert";
interface Props {
  client: any;
  openModel: boolean;
  setOpenModel: (val: boolean) => void;
}

const InformationClient = ({ client, openModel, setOpenModel }: Props) => {
  const handleCloseModel = () => {
    setOpenModel(false);
  };
  return (
    <Modal open={openModel} onClose={handleCloseModel} size="xs">
      <Modal.Header>
        <Modal.Title>Thông tin khách hàng :</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="client-row">
            <div className="client-col-1">Họ và tên</div>
            <div>: {client.Ten}</div>
          </div>
          <div className="client-row">
            <div className="client-col-1">Ngày sinh</div>
            <div>: {new Date(client.NgaySinh).toLocaleDateString()}</div>
          </div>
          <div className="client-row">
            <div className="client-col-1">Số điện thoại</div>
            <div>: {client.SDT}</div>
          </div>
          <div className="client-row">
            <div className="client-col-1">Email</div>
            <div>: {client.Email}</div>
          </div>
          <div className="client-row">
            <div className="client-col-1">Giới tính</div>
            <div>: {convertSex(client.GioiTinh)}</div>
          </div>
          <div className="client-row">
            <div className="client-col-1">Địa chỉ</div>
            <div>: {client.DiaChi}</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModel} appearance="primary">
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default InformationClient;
