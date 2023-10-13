import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PayPalButton } from "react-paypal-button-v2";
import {
  deleteManyCartByIdClient,
  getCartByIdClient,
} from "../../stores/slices/cartSlice";
import { RootState } from "../../stores";
import { useNavigate } from "react-router-dom";
import { getAllProduct } from "../../stores/slices/productSlice";

import "./style.css";
import { createBillOfSale } from "../../stores/slices/billOfSaleSlice";
import { Radio, RadioGroup } from "rsuite";
import {
  checkoutByVNPay,
  getConfigPayment,
} from "../../services/payment.service";
interface Props {
  idClient: any;
  name: string;
  phone: string;
  address: string;
  note: string;
}
const SeenCart = ({ idClient, name, phone, address, note }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [pay, setPay] = useState("later-money");
  const [sdkReady, setSdkReady] = useState(false);

  const { listCart } = useSelector((state: RootState) => state.cart);
  const { listProduct } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(getCartByIdClient(idClient));
    dispatch(getAllProduct());
  }, [dispatch, idClient]);

  useEffect(() => {
    if (listCart.length > 0) {
      let count = 0;
      listCart.forEach((val) => {
        count += val.SoLuong * val.DonGia;
      });
      setTotal(count);
    }
  }, [listCart]);

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const handleOrder = () => {
    dispatch(
      createBillOfSale({
        bill: {
          MaKH: idClient,
          GhiChu: note,
          DiaChi: address,
          SDTNhan: phone,
          TenNguoiNhan: name,
          TongTien: total,
          NguoiLap:'KhachHang'
        },
        listProduct: listCart.map((val) => {
          return {
            product: {
              Ma: val.MaSP,
              GiaBan: val.DonGia,
              KhuyenMai: 0,
            },
            size: val.KichThuoc,
            color: val.Mau,
            quantity: val.SoLuong,
          };
        }),
        navigate: () => {
          alert("Mua hàng thành công");
          dispatch(deleteManyCartByIdClient(idClient));
          navigate("/purchase");
        },
      })
    );
  };
  const onSuccessPaypal = (details, data) => {
    dispatch(
      createBillOfSale({
        bill: {
          MaKH: idClient,
          GhiChu: note,
          DiaChi: address,
          SDTNhan: phone,
          TenNguoiNhan: name,
          TongTien: total,
          ThanhToan: true,
          PhuongThucTT:'Paypal',NguoiLap: "KhachHang",
        },
        listProduct: listCart.map((val) => {
          return {
            product: {
              Ma: val.MaSP,
              GiaBan: val.DonGia,
              KhuyenMai: 0,
            },
            size: val.KichThuoc,
            color: val.Mau,
            quantity: val.SoLuong,
          };
        }),
        navigate: () => {
          alert("Mua hàng thành công");
          dispatch(deleteManyCartByIdClient(idClient));
          navigate("/purchase");
        },
      })
    );
  };

  const handlePayment = (e) => {
    setPay(e);
  };
  const addPaypalScript = async () => {
    const { data } = await getConfigPayment();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data.data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  const handleOrderByVNPay = async () => {
    const { data } = await checkoutByVNPay({ amount: 20000 });
    window.location.href = data;
    console.log(data);
  };
  return (
    <>
      {listCart.length > 0 && (
        <div className="wrapper-checkout">
          <table>
            <thead>
              <tr>
                <th style={{ width: "300px" }}>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>màu</th>
                <th>Kích thước</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {listCart.map((val, ind) => {
                return listProduct.map((pro, index) => {
                  if (val.MaSP === pro.Ma)
                    return (
                      <tr key={ind}>
                        <td style={{ padding: "20px 30px 20px 10px" }}>
                          {pro.Ten}
                        </td>
                        <td>{val.DonGia}</td>
                        <td>{val.Mau}</td>
                        <td>{val.KichThuoc}</td>
                        <td>{val.SoLuong}</td>
                        <td>{val.DonGia * val.SoLuong}</td>
                      </tr>
                    );
                  return "";
                });
              })}
            </tbody>
          </table>
          <div className="wrapper-radio-pay">
            <fieldset>
              <legend>Chọn phương thức thanh toán</legend>
              <div className="radio-group">
                <RadioGroup onChange={handlePayment} value={pay}>
                  <Radio value="later-money">Thanh toán khi nhận hàng</Radio>
                  <Radio value={"paypal"}>Thanh toán bằng Paypal</Radio>
                  <Radio value={"vnPay"} disabled>Thanh toán bằng VNPay</Radio>
                </RadioGroup>
              </div>
            </fieldset>
          </div>
          <div className="wrapper-btn-add">
            <div className="total-price">Tổng Tiền : {total}</div>
            {pay === "paypal" && sdkReady ? (
              <PayPalButton
                amount={(total / 23000).toFixed(2)}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={onSuccessPaypal}
                onError={() => {
                  alert("error");
                }}
              />
            ) : pay === "vnPay" ? (
              <div
                className="btn-add"
                onClick={handleOrderByVNPay}
                style={{ width: "200px", height: "35px", borderRadius: "4px" }}
              >
                VNPay
              </div>
            ) : (
              <div
                className="btn-add"
                onClick={handleOrder}
                style={{ width: "200px", height: "35px", borderRadius: "4px" }}
              >
                Đặt hàng
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SeenCart;
