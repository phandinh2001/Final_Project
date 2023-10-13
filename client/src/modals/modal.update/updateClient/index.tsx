import React, { useState } from "react";
import DefaultModel from "../../../layouts/admin/defaultModel";
import { Button, InputField } from "@gapo_ui/components";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import {
  checkErrValidateForm,
  validateBirthday,
  validateEmail,
  validateFullName,
} from "../../../helpers/validator";
import { useInput } from "../../../hooks/useInput";
import { convertValueDateToString } from "../../../helpers/convert";
import { useDispatch } from "react-redux";
import { updateClient } from "../../../stores/slices/clientSlice";
import { useNavigate } from "react-router-dom";
interface Props {
  setIsUpdate: (val: boolean) => void;
  client: any;
}
const UpdateClient = ({ setIsUpdate, client }: Props) => {
  const { message } = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useInput(client.Ten, validateFullName);
  const email = useInput(client.Email, validateEmail);
  const [sex, setSex] = useState(client.GioiTinh ? client.GioiTinh : "nam");
  const [address, setAddress] = useState(client.DiaChi);
  const [birthday, setBirthday] = useState(
    convertValueDateToString(client.NgaySinh)
  );
  const [helper, setHelper] = useState("");
  const [isErrDate, setIsErrDate] = useState(false);

  const handleCancel = () => {
    navigate("/admin/quan_ly/khach_hang");
    setIsUpdate(false);
  };

  const onChangeName = (e: any) => {
    name.setValue(e.target.value);
  };

  const onChangeBirth = (e: any) => {
    setBirthday(e.target.value);
  };

  const onChangeSex = (e) => {
    setSex(e.target.value);
  };
  const onChangAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangeEmail = (e) => {
    email.setValue(e.target.value);
  };

  const handleUpdate = () => {
    if (isErr() === false) {
      dispatch(
        updateClient({
          id: client._id,
          email: email.value,
          name: name.value,
          sex,
          birthday,
          address,
          handleBack: () => {
            alert("cập nhật thành công");
            handleCancel();
          },
        })
      );
    }
  };

  const isErr = () => {
    return checkErrValidateForm(name.err(), errDatePicker(), email.err());
  };

  const errDatePicker = () => {
    const { errText, isErr } = validateBirthday(
      new Date(birthday).toLocaleDateString()
    );
    setHelper(errText);
    setIsErrDate(isErr);
    return isErr;
  };

  return (
    <>
      <DefaultModel onClickCancel={handleCancel}>
        <div>
          <h3 className="title">Cập nhật khách hàng</h3>
          <div className="wrapper-create-client">
            <div className="wrapper-input">
              <InputField
                fullWidth
                label="Họ và Tên"
                placeholder="Họ và tên"
                value={name.value}
                helperText={name.helperText}
                error={name.isErr}
                onChange={onChangeName}
              />
            </div>
            <div className="wrapper-input">
              <InputField
                fullWidth
                label="Số điện thoại"
                placeholder="Số điện thoại"
                // leftItem={<IconIc24FillPhone />}
                defaultValue={client.SDT}
                disabled
              />
              <div className="message">{message}</div>
            </div>
            <div className="wrapper-input">
              <InputField
                fullWidth
                label="Email"
                placeholder="Email"
                // leftItem={<IconIc24FillPhone />}
                value={email.value}
                helperText={email.helperText}
                error={email.isErr}
                onChange={onChangeEmail}
              />
            </div>
            <div className="wrapper-input">
              <label className="title-select">Giới tính:</label>
              <br />
              <select
                className="select"
                onChange={onChangeSex}
                defaultValue={sex}
              >
                <option value={"nam"}>Nam</option>
                <option value={"nu"}>Nữ</option>
              </select>
            </div>
            <div className="wrapper-input">
              <InputField
                fullWidth
                label="Ngày sinh"
                type="date"
                value={birthday}
                helperText={helper}
                error={isErrDate}
                className="datePicker"
                onChange={onChangeBirth}
              />
            </div>
            <div className="wrapper-input">
              <InputField
                fullWidth
                label="Địa chỉ"
                placeholder="Địa chỉ"
                value={address}
                onChange={onChangAddress}
              />
            </div>
          </div>
          <div className="btn-create-client">
            <Button color="accentPrimary" onPress={handleUpdate}>
              Cập nhật
            </Button>
          </div>
        </div>
      </DefaultModel>
    </>
  );
};
export default UpdateClient;
