export const findPhoneInArr = (arr, phone) => {
  if (arr && phone)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].SDT === phone) return true;
    }
  return false;
};
