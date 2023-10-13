import React, { useEffect, useState } from "react";
import Banner from "../../../components.client/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { getClientItemByPhone } from "../../../stores/slices/clientSlice";
import { Link } from "react-router-dom";

import "./style.css";
import PurchaseBuying from "../../../components.client/PurchaseBuying";
import PurchaseBought from "../../../components.client/PurchaseBought";
import PurchaseCancelled from "../../../components.client/PurchaseCancelled";
const Purchase = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const { clientItem } = useSelector((state: RootState) => state.clients);

  const [purchase, setPurchase] = useState(1);
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (user.phone) dispatch(getClientItemByPhone(user.phone));
  }, [dispatch, user.phone]);

  const handlePurchase = (val) => {
    setPurchase(val);
    setActive(val);
  };
  return (
    <div>
      <Banner title="Đơn Mua" bread="Danh sách hóa đơn" />
      <section className="ftco-section ">
        <div className="container">
          {clientItem && Object.keys(clientItem).length > 0 ? (
            <div className="wrapper-purchase">
              <div className="wrapper-title">
                <div
                  onClick={(e) => handlePurchase(1)}
                  className={active === 1 ? "active" : ""}
                >
                  Đơn hàng đang mua
                </div>
                <div
                  onClick={(e) => handlePurchase(2)}
                  className={active === 2 ? "active" : ""}
                >
                  Đơn hàng đã mua
                </div>
                <div
                  onClick={(e) => handlePurchase(3)}
                  className={active === 3 ? "active" : ""}
                >
                  Đơn hàng đã hủy
                </div>
              </div>
              <div className="wrapper-purchase-content">
                {purchase === 1 ? (
                  <PurchaseBuying idClient={clientItem.Ma} />
                ) : purchase === 2 ? (
                  <PurchaseBought idClient={clientItem.Ma} />
                ) : (
                  <PurchaseCancelled idClient={clientItem.Ma} />
                )}
              </div>
            </div>
          ) : (
            <div style={{ width: "100%", textAlign: "center" }}>
              <div>Hãy đăng nhập để mua hàng</div>
              <br />
              <Link to={"/login"} className="btn btn-danger">
                Đăng Nhập
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Purchase;
