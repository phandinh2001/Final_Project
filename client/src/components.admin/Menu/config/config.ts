import { IconIc24FillHouse } from "@gapo_ui/icon";
import { IconIc24Fill4SquareMenu } from "@gapo_ui/icon";
import { IconIc24FillPersonGear } from "@gapo_ui/icon";
import {IconIc24FillBubbleEllipseDot} from '@gapo_ui/icon';

export const listItem = [
  {
    children: "Trang chủ",
    icon: IconIc24FillHouse,
    url: "/admin",
  },
  {
    children: "Quản lý",
    icon: IconIc24Fill4SquareMenu,
    url: "/admin/quan_ly",
  },
  {
    children: "Tin Nhắn",
    icon: IconIc24FillBubbleEllipseDot,
    url: "/admin/tin_nhan",
  },
  {
    children: "Hồ sơ",
    icon: IconIc24FillPersonGear,
    url: "/admin/ho_so",
  },
];
