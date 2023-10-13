import { Button, InputField } from "@gapo_ui/components";
import React, { useEffect, useState } from "react";
import { validatePhone } from "../../helpers/validator";
import { useInput } from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { findClientByPhone } from "../../services/client.service";
import { clearMessage, setMessage } from "../../stores/slices/messageSlice";

import "./style.css";
import { convertSex } from "../../helpers/convert";
import CreateClient from "../../modals/modal.create/createClient";
interface Props {
  setClientItem: (val: any) => void;
}
const ChooseClient = ({ setClientItem }: Props) => {
  const phoneClient = useInput("", validatePhone);
  const [client, setClient] = useState<any>(null);
  const [openCreateClient, setOpenCreateClient] = useState<boolean>(false);

  const { message } = useSelector((state: RootState) => state.message);

  const dispatch = useDispatch();

  const onChangePhoneClient = (e: any) => {
    phoneClient.setValue(e.target.value);
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);
  const handleCheckPhoneClient = async (phone) => {
    if (phoneClient.err() === false) {
      try {
        const res = await findClientByPhone(phone);
        setClient(res.data[0]);
        setClientItem(res.data[0]);
        dispatch(clearMessage());
      } catch (e) {
        dispatch(setMessage(e.response.data));
      }
    }
  };
  const handleCreateClient = () => {
    setOpenCreateClient(true);
  };

  return (
    <div className="information-client">
      <div>
        <div className="wrapper-input">
          <InputField
            fullWidth
            label="Số điện thoại khách hàng"
            placeholder="Số điện thoại"
            value={phoneClient.value}
            helperText={phoneClient.helperText}
            error={phoneClient.isErr}
            onChange={onChangePhoneClient}
          />
          <div className="error">{message}</div>
        </div>
        <div className="wrapper-btn-client">
          <Button
            color="accentPrimary"
            onPress={() => handleCheckPhoneClient(phoneClient.value)}
          >
            Kiểm tra
          </Button>
          <Button color="accentPrimary" onPress={handleCreateClient}>
            Thêm khách hàng
          </Button>
        </div>
      </div>
      {client && (
        <div className="detail-client">
          <div>
            <div>Họ và tên : </div>
            <div>{client.Ten}</div>
          </div>
          <div>
            <div>Số điện thoại : </div>
            <div>{client.SDT}</div>
          </div>
          <div>
            <div>Ngày sinh : </div>
            <div>{new Date(client.NgaySinh).toLocaleDateString()}</div>
          </div>
          {client.GioiTinh && (
            <div>
              <div>Giới tính : </div>
              <div>{convertSex(client.GioiTinh)}</div>
            </div>
          )}
          {client.Email && (
            <div>
              <div>Email : </div>
              <div>{client.Email}</div>
            </div>
          )}
          {client.DiaChi && (
            <div>
              <div>Địa chỉ : </div>
              <div>{client.DiaChi}</div>
            </div>
          )}
        </div>
      )}
      {openCreateClient && (
        <CreateClient
          setIsCreate={setOpenCreateClient}
          navigateUrl="/admin/quan_ly/hoa_don_ban/them_moi"
        />
      )}
    </div>
  );
};

export default ChooseClient;
