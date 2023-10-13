import "./style.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultModel from "../../../layouts/admin/defaultModel";
import ChooseClient from "../../../components.admin/ChooseClient";
import DeliveryAddress from "../../../components.admin/DeliveryAddress";
import ChooseProduct from "../../../components.admin/chooseProduct";

interface Props {
  setIsCreate: (val: boolean) => void;
}
const CreateBillOfSale = ({ setIsCreate }: Props) => {
  const [clientItem, setClientItem] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    setIsCreate(false);
    navigate("/admin/quan_ly/hoa_don_ban");
  };

  return (
    <DefaultModel onClickCancel={handleBack}>
      <div>
        <h3 className="title">Thêm mới hóa đơn bán</h3>
        <div className="wrapper-create-bill">
          <ChooseClient setClientItem={setClientItem} />
          <DeliveryAddress
            clientItem={clientItem}
            setName={setName}
            setPhone={setPhone}
            setAddress={setAddress}
            setNote={setNote}
            name={name}
            phone={phone}
            note={note}
            address={address}
            navigate="/admin/quan_ly/hoa_don_ban/them_moi"
          />
          <ChooseProduct
            client={clientItem}
            name={name}
            phone={phone}
            note={note}
            address={address}
            handleBack={handleBack}
          />
        </div>
      </div>
    </DefaultModel>
  );
};

export default CreateBillOfSale;
