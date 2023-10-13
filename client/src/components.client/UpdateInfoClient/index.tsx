import { Button, InputField } from "@gapo_ui/components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  checkErrValidateForm,
  validateBirthday,
  validateEmail,
  validateFullName,
} from "../../helpers/validator";
import { useInput } from "../../hooks/useInput";
import { convertValueDateToString } from "../../helpers/convert";
import { updateInformationClient } from "../../stores/slices/clientSlice";

interface Props {
  client: any;
}

const UpdateInfoClient = ({ client }: Props) => {
  const dispatch = useDispatch();
  const name = useInput(client.Ten, validateFullName);
  const email = useInput(client.Email, validateEmail);
  const [sex, setSex] = useState(client.GioiTinh ? client.GioiTinh : "nam");
  const [address, setAddress] = useState(client.DiaChi);
  const [birthday, setBirthday] = useState(
    convertValueDateToString(client.NgaySinh)
  );
  const [helperDate, setHelperDate] = useState("");
  const [isErrDate, setIsErrDate] = useState(false);

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

  const handleUpdateInfoClient = async () => {
    if (isErr() === false)
      dispatch(
        updateInformationClient({
          id: client._id,
          client: {
            SDT: client.SDT,
            Ten: name.value,
            Email: email.value,
            GioiTinh: sex,
            DiaChi: address,
            NgaySinh: birthday,
          },
        })
      );
  };
  const isErr = () => {
    return checkErrValidateForm(name.err(), errDatePicker(), email.err());
  };

  const errDatePicker = () => {
    const { errText, isErr } = validateBirthday(
      new Date(birthday).toLocaleDateString()
    );
    setHelperDate(errText);
    setIsErrDate(isErr);
    return isErr;
  };
  return (
    <div className="wrapper-create-client">
      <div className="wrapper-input">
        <InputField
          fullWidth
          label="Số điện thoại"
          placeholder="Số điện thoại"
          // leftItem={<IconIc24FillPhone />}
          defaultValue={client.SDT}
          disabled
        />
      </div>
      <div className="wrapper-input">
        <InputField
          fullWidth
          label="Họ và Tên"
          placeholder="Họ và tên"
          // value={name.value}
          defaultValue={client.Ten}
          helperText={name.helperText}
          error={name.isErr}
          onChange={onChangeName}
        />
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
          className="select-information"
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
          helperText={helperDate}
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
      <div className="btn-information">
        <div className="btn-save">
          <Button color="accentPrimary" onPress={handleUpdateInfoClient}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfoClient;
