import { Button } from "@gapo_ui/components";
import React, { useEffect, useState } from "react";
import { IconIc24FillPinlocation } from "@gapo_ui/icon";

import "./style.css";
import UpdateAddress from "../../modals/modal.update/updateAddress";

interface Props {
  clientItem?: any;
  setName: (val: string) => void;
  setPhone: (val: string) => void;
  setAddress: (val: string) => void;
  setNote: (val: string) => void;
  name: string;
  phone: string;
  address: string;
  note: string;
  navigate?: string;
}
const DeliveryAddress = ({
  clientItem = null,
  setName,
  setPhone,
  setAddress,
  setNote,
  name,
  phone,
  address,
  note,
  navigate = "/",
}: Props) => {
  const [error, setError] = useState<string>("");

  const [openUpdateAddress, setOpenUpdateAddress] = useState<boolean>(false);

  useEffect(() => {
    if (clientItem && Object.keys(clientItem).length > 0) {
      setName(clientItem.Ten);
      setPhone(clientItem.SDT);
      setAddress(clientItem.DiaChi);
      setError("");
    }
  }, [clientItem, setAddress, setName, setPhone]);

  const handleUpdateAddress = () => {
    if (!clientItem || Object.keys(clientItem).length < 0) {
      setError("Bạn phải chọn khách hàng trước");
    } else setOpenUpdateAddress(true);
  };
  return (
    <div className="delivery-address">
      <div className="vtrWey"></div>
      <div className="content">
        <div className="title-address">
          <IconIc24FillPinlocation size={18} color="negativePrimary" />
          <div>Địa chỉ nhận hàng</div>
          <Button
            color="accentWorkSecondary"
            size="small"
            onPress={handleUpdateAddress}
          >
            Cập nhật
          </Button>
        </div>
        <div className="wrapper-address">
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <div className="name">{name}</div>
              <div className="phone">{phone}</div>
              <div className="address">
                {address ? address : "Chưa có địa chỉ cụ thể"}
              </div>
            </>
          )}
        </div>
        <div className="note">{note}</div>
        {openUpdateAddress && (
          <UpdateAddress
            setIsCreate={setOpenUpdateAddress}
            setName={setName}
            setPhone={setPhone}
            setAddress={setAddress}
            setNote={setNote}
            name={name}
            phone={phone}
            note={note}
            address={address}
            navigate={navigate}
          />
        )}
      </div>
    </div>
  );
};

export default DeliveryAddress;
