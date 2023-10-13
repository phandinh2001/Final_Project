import React, { useEffect, useState } from "react";
import Banner from "../../../components.client/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { getClientItemByPhone } from "../../../stores/slices/clientSlice";
import { Link } from "react-router-dom";
import SeenCart from "../../../components.client/SeenCart";
import DeliveryAddress from "../../../components.admin/DeliveryAddress";

const Checkout = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const user = useSelector((state: RootState) => state.user);
  const { clientItem } = useSelector((state: RootState) => state.clients);

  useEffect(() => {
    if (user.phone) dispatch(getClientItemByPhone(user.phone));
  }, [dispatch, user.phone]);

  return (
    <div>
      <Banner title="Hóa Đơn" bread="Thanh Toán" />
      <section className="ftco-section ">
        <div className="container">
          {clientItem && Object.keys(clientItem).length > 0 ? (
            <>
              <DeliveryAddress
                clientItem={clientItem}
                setName={setName}
                setPhone={setPhone}
                setAddress={setAddress}
                setNote={setNote}
                name={name}
                phone={phone}
                note={note}
                address={address}
                navigate="/checkout"
              />
              <SeenCart
                idClient={clientItem.Ma}
                name={name}
                phone={phone}
                note={note}
                address={address}
              />
            </>
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

export default Checkout;
