import React, { useEffect } from "react";
import Banner from "../../../components.client/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores";
import ListCart from "../../../components.client/ListCart";
import { getClientItemByPhone } from "../../../stores/slices/clientSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const { clientItem } = useSelector((state: RootState) => state.clients);

  useEffect(() => {
    if (user.phone) dispatch(getClientItemByPhone(user.phone));
  }, [dispatch, user.phone]);

  return (
    <div>
      <Banner title="Giỏ Hàng" bread="Giỏ Hàng của tôi" />
      <section className="ftco-section ftco-cart">
        <div className="container">
          {clientItem && Object.keys(clientItem).length > 0 ? (
            <ListCart idClient={clientItem.Ma} />
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

export default Cart;
