const config = [
  ["ho_so", "Hồ sơ"],
  ["quan_ly", "Quản lý"],
  ["san_pham", "Sản phẩm"],
  ["hoa_don_ban", "Hóa đơn bán"],
  ["hoa_don_nhap", "Hóa đơn nhập"],
  ["loai_san_pham", "Loại sản phẩm"],
  ["khach_hang", "Khách hàng"],
  ["tai_khoan", "Tài Khoản"],
  ["tin_nhan", "Tin nhắn"],
  ["nha_cung_cap", "Nhà cung cấp"],
  ["thuong_hieu", "Thương hiệu"],
];

export const convertPathName = (url: string): any => {
  const arrUrl = url.split("/");
  arrUrl.splice(0, 2);
  if (arrUrl.length < 1) return ["Trang chủ"];
  else {
    const arrName: any[] = [];
    for (let i = 0; i < config.length; i++) {
      for (let j = 0; j < arrUrl.length; j++) {
        if (config[i][0] === arrUrl[j]) arrName.push(config[i][1]);
      }
    }
    return arrName;
  }
};
