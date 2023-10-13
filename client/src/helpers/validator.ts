/* eslint-disable no-useless-escape */
interface Validate {
  errText: string;
  isErr: boolean;
}

export const isEmpty = (value: string): Validate => {

  return value.toString().trim()
    ? { errText: "", isErr: false }
    : { errText: "Không được để trống!", isErr: true };
};
export const validateEmail = (value: string): Validate => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { errText, isErr } = isEmpty(value);
  if (isErr) return { errText: errText, isErr: true };
  if (!regex.test(value))
    return { errText: "Email không chính xác", isErr: true };
  return { errText: "", isErr: false };
};
export const validateBirthday = (value: string): Validate => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  const { errText, isErr } = isEmpty(value);
  if (isErr) return { errText: errText, isErr: true };
  if (!regex.test(value))
    return { errText: "Ngày sinh không chính xác", isErr: true };
  return { errText: "", isErr: false };
};

export const validatePassword = (value: string): Validate => {
  const regex = /^([\@\w\.]){6,20}$/;
  const { errText, isErr } = isEmpty(value);
  if (isErr) return { errText: errText, isErr: true };
  if (!regex.test(value))
    return { errText: "Mật khẩu không chính xác", isErr: true };
  return { errText: "", isErr: false };
};

export const validatePhone = (value: string): Validate => {
  const regex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  const { errText, isErr } = isEmpty(value);
  if (isErr) return { errText: errText, isErr: true };
  if (!regex.test(value))
    return { errText: "Số điện thoại không chính xác", isErr: true };
  return { errText: "", isErr: false };
};
export const validateNumber = (value: string): Validate => {
  const regex = /^-?\d+$/;
  const { errText, isErr } = isEmpty(value);
  if (isErr) return { errText: errText, isErr: true };
  if (!regex.test(value))
    return { errText: "chỉ có thể nhập số nguyên", isErr: true };
  return { errText: "", isErr: false };
};
export const validateSize = (value: string): Validate => {
  const regex = /^[1-9][0-9]{0,2}$|^[A-Z]{1,3}$/;
  const { errText, isErr } = isEmpty(value);
  if (isErr) return { errText: errText, isErr: true };
  if (!regex.test(value))
    return { errText: "chỉ được nhập 1->3 ký tự, số hoặc chữ", isErr: true };
  return { errText: "", isErr: false };
};
export const validatePromotion = (value: string): Validate => {
  const regex = /^\d+$/;
  if (value.toString().trim()) {
    if (!regex.test(value))
      return { errText: "chỉ có thể nhập số", isErr: true };
    if (Number(value) > 100)
      return { errText: "không được nhập số lớn hơn 100", isErr: true };
  }
  return { errText: "", isErr: false };
};

export const validateFullName = (value: string): Validate => {
  return isEmpty(value).isErr
    ? { errText: isEmpty(value).errText, isErr: true }
    : { errText: "", isErr: false };
};

export function checkErrValidateForm(...errList: boolean[]): boolean {
  for (let i = 0; i < errList.length; i++) if (errList[i]) return true;
  return false;
}
