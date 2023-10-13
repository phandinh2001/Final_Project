export const convertSex = (value: string): string => {
  if (!value) return "";
  if (value === "nu") return "Nữ";
  if (value === "nam") return "Nam";
  return "Nam và nữ";
};

export const convertIsAdmin = (value: string): string => {
  if (value === "QuanLy") return "Quản lý";
  return "Khách hàng";
};

export const convertValueDateToString = (value: string): any => {
  const date = new Date(value).toLocaleDateString().split("/");
  const d = Number(date[0]) < 10 ? `0${Number(date[0])}` : date[0];
  const m = Number(date[1]) < 10 ? `0${Number(date[1])}` : date[1];
  return `${date[2]}-${m}-${d}`;
};

export const formatDate = (value: string): any => {
  const date = new Date(value);
  const d = date.getDate();
  const m = Number(date.getMonth()) + 1;
  const y = date.getFullYear()
  return `${d}-${m}-${y}`;
};
