import { Button, PasswordField } from "@gapo_ui/components";
import React from "react";
import {
  checkErrValidateForm,
  isEmpty,
  validatePassword,
} from "../../helpers/validator";
import { useInput } from "../../hooks/useInput";
import { updatePassword } from "../../services/user.service";
interface Props{
    phone:any
}
const UpdatePassword = ({phone}:Props) => {
  const currentPass = useInput("", validatePassword);
  const newPass = useInput("", validatePassword);
  const confirmPass = useInput("", validatePassword);

  const onChangeCurrentPassword = (e) => {
    currentPass.setValue(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    newPass.setValue(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    confirmPass.setValue(e.target.value);
  };

  const handleSaveChangePassword = async (e) => {
    if (isErr() === false) {
        await updatePassword(phone, currentPass.value, newPass.value)
          .then((data) => {
            alert("Cập nhật mật khẩu thành công");
            currentPass.reset();
            newPass.reset();
            confirmPass.reset();
          })
          .catch((e) => {
            currentPass.setHelperText(e.response.data);
            currentPass.setIsErr(true);
          });
    }
  };
  const isErr = (): boolean => {
    if (!currentPass.err() && newPass.value === currentPass.value) {
      newPass.setHelperText("mật khẩu mới phải khác với mật khẩu hiện tại");
      newPass.setIsErr(true);
      return true;
    }
    return checkErrValidateForm(
      currentPass.err(),
      newPass.err(),
      checkErrConfirmPass()
    );
  };
  const checkErrConfirmPass = (): boolean => {
    let err = isEmpty(confirmPass.value).errText;
    if (!err)
      err =
        confirmPass.value === newPass.value ? "" : "Mật khẩu không trùng khớp";
    confirmPass.setHelperText(err);
    confirmPass.setIsErr(!!err);
    return !!err;
  };
  return (
    <div className="wrapper-create-client">
      <div className="wrapper-input">
        <PasswordField
          label={"Mật khẩu hiện tại"}
          placeholder="Mật khẩu hiện tại"
          fullWidth
          onChange={onChangeCurrentPassword}
          helperText={currentPass.helperText}
          error={currentPass.isErr}
          value={currentPass.value}
        />
      </div>
      <div className="wrapper-input">
        <PasswordField
          label={"Mật khẩu mới"}
          placeholder="Mật khẩu mới"
          fullWidth
          onChange={onChangeNewPassword}
          helperText={newPass.helperText}
          error={newPass.isErr}
          value={newPass.value}
        />
      </div>
      <div className="wrapper-input">
        <PasswordField
          label={"Xác nhận mật khẩu"}
          placeholder="Xác nhận mật khẩu"
          className="password"
          fullWidth
          onChange={onChangeConfirmPassword}
          helperText={confirmPass.helperText}
          error={confirmPass.isErr}
          value={confirmPass.value}
        />
      </div>
      <div className="btn-information">
        <div className="btn-save">
          <Button color="accentPrimary" onPress={handleSaveChangePassword}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
