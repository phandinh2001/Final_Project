export const convertNameToAvatar = (name: string) => {
  const arrName = name.split(" ");
  if (arrName.length > 1) {
    const last = arrName.pop()!.slice(0, 1).toLocaleUpperCase();
    const first = arrName.pop()!.slice(0, 1).toLocaleUpperCase();
    return `${first}${last}`;
  }
  return arrName.pop()!.slice(0, 1).toLocaleUpperCase();
};
