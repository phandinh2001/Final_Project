import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@gapo_ui/components";
import { IoMdSettings } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { IconIc24FillArrowheadDown } from "@gapo_ui/icon";
import { IconIc24FillDocCheck } from "@gapo_ui/icon";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { logout } from "../../stores/slices/userSlice";
import {
  getClientItemByPhone,
  removeClientItemInStore,
} from "../../stores/slices/clientSlice";
import {
  getCartByIdClient,
  removeCartInClient,
} from "../../stores/slices/cartSlice";

let listMenuInfo = [
  {
    navigate: "/",
    name: "Trang Chủ",
    active: "active",
  },
  {
    navigate: "/shop",
    name: "Cửa hàng",
    active: "",
  },
  {
    navigate: "/contact",
    name: "Liên hệ",
    active: "",
  },
];
type Props = {
  avtStr?: string;
};
const Header = ({ avtStr }: Props) => {
  const [listMenu, setListMenu] = useState(listMenuInfo);
  const [disable, setDisable] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const { clientItem } = useSelector((state: RootState) => state.clients);
  const { listCart } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleEventDisplay = () => {
    setDisable((prev) => {
      return prev ? false : true;
    });
  };

  useEffect(() => {
    if (user.phone) dispatch(getClientItemByPhone(user.phone));
  }, [dispatch, user.phone]);
  useEffect(() => {
    if (clientItem && clientItem.Ma) dispatch(getCartByIdClient(clientItem.Ma));
  }, [clientItem, dispatch]);
  const handleSetting = () => {
    setDisable((prev) => !prev);
    navigate("/setting");
  };
  const handlePurchase = () => {
    setDisable((prev) => !prev);
    navigate("/purchase");
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeCartInClient());
    dispatch(removeClientItemInStore());
    navigate("/");
    setDisable((prev) => !prev);
  };
  const handleLogIn = () => {
    navigate("/login");
  };

  useEffect(() => {
    const arr = listMenuInfo.map((val) => {
      if (location.pathname === val.navigate)
        return {
          ...val,
          active: "active",
        };
      return {
        ...val,
        active: "",
      };
    });
    setListMenu(arr);
  }, [location.pathname]);
  const handleActive = (ind) => {
    const arr = listMenuInfo.map((val, index) => {
      if (ind === index)
        return {
          ...val,
          active: "active",
        };
      return {
        ...val,
        active: "",
      };
    });
    setListMenu(arr);
  };
  return (
    <>
      <div className="py-1 bg-black">
        <div className="container">
          <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
            <div className="col-lg-12 d-block">
              <div className="row d-flex">
                <div className="col-md pr-4 d-flex topper align-items-center">
                  <div className="icon mr-2 d-flex justify-content-center align-items-center">
                    <span className="icon-phone2"></span>
                  </div>
                  <span className="text">0969997483</span>
                </div>
                <div className="col-md pr-4 d-flex topper align-items-center">
                  <div className="icon mr-2 d-flex justify-content-center align-items-center">
                    <span className="icon-paper-plane"></span>
                  </div>
                  <span className="text">phanvandinh492001@gmail.com</span>
                </div>
                <div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                  <span className="text">
                    3-5 NGÀY LÀM VIỆC GIAO HÀNG &amp; TRẢ LẠI MIỄN PHÍ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <Link to={"/"} className="navbar-brand" style={{fontSize: 40, fontWeight: 300, fontFamily: 'Script'}}>
            DPV
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu"></span> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              {listMenu.map((val, ind) => (
                <li
                  className={`nav-item ${val.active} item`}
                  key={ind}
                  onClick={() => handleActive(ind)}
                >
                  <Link to={val.navigate} className="nav-link">
                    {val.name}
                  </Link>
                </li>
              ))}
              <li className="nav-item cta cta-colored item">
                <Link to={"/cart"} className="nav-link">
                  <span className="icon-shopping_cart"></span>[{listCart.length}
                  ]
                </Link>
              </li>
              <li className="nav-item nav-item-avt">
                {user.isLoggedIn ? (
                  <div className="nav-header-avt">
                    <span className="name">Hi! {user.username}</span>
                    <div className={"avatar"} onClick={handleEventDisplay}>
                      {user.avatar ? (
                        <Avatar
                          src={user.avatar}
                          size={32}
                          alt="icon-80"
                        />
                      ) : (
                        <Avatar
                          size={32}
                          UNSAFE_style={{ background: "#f16654" }}
                        >
                          {avtStr}
                        </Avatar>
                      )}
                    </div>
                    <div onClick={handleEventDisplay}>
                      <IconIc24FillArrowheadDown
                        UNSAFE_style={{ marginTop: "5px", cursor: "pointer" }}
                      />
                    </div>
                    {disable && (
                      <div className="user">
                        <div className="purchase" onClick={handlePurchase}>
                          <IconIc24FillDocCheck
                            size={20}
                            color="contentTertiary"
                          />
                          <span>Đơn mua</span>
                        </div>
                        <div className="line" />
                        <div className="setting" onClick={handleSetting}>
                          <IoMdSettings size={20} />
                          <span>Cài đặt</span>
                        </div>
                        <div className="line" />
                        <div className="signUp" onClick={handleLogout}>
                          <BiLogIn size={20} />
                          <span>Đăng xuất</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ cursor: "pointer" }} onClick={handleLogIn}>
                    Đăng nhập / Đăng ký
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
