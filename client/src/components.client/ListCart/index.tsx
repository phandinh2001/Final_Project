import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconIc24FillArchiveBoxXmark } from "@gapo_ui/icon";
import {
  deleteCartItem,
  getCartByIdClient,
  updateCart,
} from "../../stores/slices/cartSlice";
import { RootState } from "../../stores";
import { Link, useNavigate } from "react-router-dom";
import { getAllProduct } from "../../stores/slices/productSlice";

import "./style.css";
interface Props {
  idClient: any;
}
const ListCart = ({ idClient }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);

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

  const handleUpdateQuantity = (e, val, pro) => {
    const value = e.target.value;
    const maxQuantity = pro.KichThuoc_Mau[val.Mau][val.KichThuoc];
    if (!value || Number(value) < 1) e.target.value = val.SoLuong;
    else if (Number(value) > Number(maxQuantity)) {
      alert(`Bạn chỉ có thể mua tối đa ${maxQuantity} sản phẩm`);
      e.target.value = maxQuantity;
      dispatch(
        updateCart({ id: val._id, cart: { SoLuong: Number(maxQuantity) } })
      );
    } else {
      dispatch(updateCart({ id: val._id, cart: { SoLuong: Number(value) } }));
    }
  };
  const handleDeleteItemCart = (id) => {
    dispatch(deleteCartItem(id));
  };
  const handleAddToCart = () => {
    navigate("/checkout");
  };
  return (
    <>
      {listCart.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th style={{ width: "300px" }}>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>màu</th>
                <th>Kích thước</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listCart.map((val, ind) => {
                return listProduct.map((pro, index) => {
                  if (val.MaSP === pro.Ma)
                    return (
                      <tr key={ind}>
                        <td style={{ padding: "20px 0px 20px 10px" }}>
                          <div className="name-product-limit-1">{pro.Ten}</div>
                        </td>
                        <td>{val.DonGia}</td>
                        <td>{val.Mau}</td>
                        <td>{val.KichThuoc}</td>
                        <td>
                          <input
                            defaultValue={val.SoLuong}
                            type="number"
                            onChange={(e) => handleUpdateQuantity(e, val, pro)}
                            min={1}
                          />
                        </td>
                        <td>{val.DonGia * val.SoLuong}</td>
                        <td>
                          <div
                            className="icon bg-color-delete"
                            onDoubleClick={() => handleDeleteItemCart(val._id)}
                          >
                            <IconIc24FillArchiveBoxXmark
                              color="lineTertiary"
                              size={14}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  return "";
                });
              })}
            </tbody>
          </table>
          <div className="wrapper-btn-add">
            <div className="total-price">Tổng Tiền : {total}</div>
            <div className="btn-add" onClick={handleAddToCart}>
              Mua Ngay
            </div>
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", textAlign: "center" }}>
          <div>Vui lòng chọn sản phẩm cần mua</div>
          <br />
          <Link to={"/shop"} className="btn btn-danger">
            Mua Ngay
          </Link>
        </div>
      )}
    </>
  );
};

export default ListCart;
