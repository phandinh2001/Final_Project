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
import { updateAdmin } from "../../stores/slices/adminSlice";

interface Props {
  admin: any;
}

const UpdateInformation = ({ admin }: Props) => {
  const dispatch = useDispatch();
  const name = useInput(admin.Ten, validateFullName);
  const email = useInput(admin.Email, validateEmail);
  const [sex, setSex] = useState(admin.GioiTinh ? admin.GioiTinh : "nam");
  const [address, setAddress] = useState(admin.DiaChi);
  const [birthday, setBirthday] = useState(
    convertValueDateToString(admin.NgaySinh)
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

  const handleUpdateInformation = async () => {
    if (isErr() === false)
      dispatch(
        updateAdmin({
          id: admin._id,
          admin: {
            SDT: admin.SDT,
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
          defaultValue={admin.SDT}
          disabled
        />
      </div>
      <div className="wrapper-input">
        <InputField
          fullWidth
          label="Họ và Tên"
          placeholder="Họ và tên"
          // value={name.value}
          defaultValue={admin.Ten}
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
          <Button color="accentPrimary" onPress={handleUpdateInformation}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInformation;
