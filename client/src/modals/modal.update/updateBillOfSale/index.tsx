import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultModel from "../../../layouts/admin/defaultModel";
import DeliveryAddress from "../../../components.admin/DeliveryAddress";

interface Props {
  setIsUpdate: (val: boolean) => void;
  bill: any;
  url?: string;
}
const UpdateBillOfSale = ({ setIsUpdate, bill, url = "" }: Props) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const handleBack = () => {
    setIsUpdate(false);
    navigate(url);
  };
  console.log(bill);

  return (
    <DefaultModel onClickCancel={handleBack}>
      <div>
        <DeliveryAddress
          setName={setName}
          setPhone={setPhone}
          setAddress={setAddress}
          setNote={setNote}
          name={name}
          phone={phone}
          note={note}
          address={address}
          navigate={`/purchase/${bill._id}`}
        />
      </div>
    </DefaultModel>
  );
};

export default UpdateBillOfSale;
