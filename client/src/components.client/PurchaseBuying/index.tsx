import React, { useEffect, useRef, useState } from "react";
import { IconIc24FillEye } from "@gapo_ui/icon";
// import { IconIc24FillPencil } from "@gapo_ui/icon";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import {
  cancelBillOfSale,
  getBillOfSaleOfClientOrderByIdClient,
} from "../../stores/slices/billOfSaleSlice";
import DetailBillOfSale from "../../modals/detailBillOfSale";

import "./style.css";
import UpdateBillOfSale from "../../modals/modal.update/updateBillOfSale";

const listStatus = ["Đang xử lý", "Chờ giao hàng", "Đã giao"];

interface Props {
  idClient: number;
}

const PurchaseBuying = ({ idClient }: Props) => {
  const dispatch = useDispatch();
  const { listBill } = useSelector((state: RootState) => state.billOfSale);
  const [openModelDetail, setOpenModelDetail] = useState(false);
  const [openModelUpdate, setOpenModelUpdate] = useState(false);
  const [lengthListBill, setLengthListBill] = useState(0);
  const idBill = useRef("");
  const billItem = useRef(null);

  useEffect(() => {
    dispatch(getBillOfSaleOfClientOrderByIdClient(idClient));
  }, [dispatch, idClient]);

  useEffect(() => {
    if (listBill.length > 0) {
      let count = 0;
      listBill.forEach((bill) => {
        if (bill.TrangThai !== "Đã giao" && bill.TrangThai !== "Đã hủy")
          count += 1;
      });
      setLengthListBill(count);
    }
  }, [listBill]);

  const handleOpenModelDetail = (bill) => {
    idBill.current = bill._id;
    billItem.current = bill;
    setOpenModelDetail(true);
  };

  const handleCancelBill = (bill) => {
    if (bill.ThanhToan || listStatus.indexOf(bill.TrangThai) > 0) {
      alert("Không thể hủy đơn hàng");
    } else {
      const isCancel = window.confirm("Bạn có muốn hủy đơn hàng không?");
      if (isCancel)
        dispatch(
          cancelBillOfSale({
            id: bill._id,
            bill: { Huy: true, TrangThai: "Đã hủy" },
          })
        );
    }
  };
  // const handleOpenModelUpdate = (bill) => {
  //   if (listStatus.indexOf(bill.TrangThai) > 0) {
  //     alert("Không thể sửa đơn hàng");
  //   } else {
  //     idBill.current = bill._id;
  //     billItem.current = bill;
  //     setOpenModelUpdate(true);
  //   }
  // };
  return (
    <div>
      {lengthListBill > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Ngày lập</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th className="col-status">Trạng thái</th>
              <th>Hủy đơn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <>
              {listBill &&
                listBill.map((bill, ind) => {
                  if (
                    bill.TrangThai !== "Đã giao" &&
                    bill.TrangThai !== "Đã hủy"
                  )
                    return (
                      <tr key={ind}>
                        <td>{new Date(bill.Ngay).toLocaleDateString()}</td>
                        <td>{bill.TongTien}</td>
                        <td>
                          <div className="wrapper-pay-td">
                            <div>
                              {bill.ThanhToan
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="wrapper-status-td">
                            <div>{bill.TrangThai}</div>
                          </div>
                        </td>
                        <td>
                          <div>
                            {bill.Huy ? (
                              <div className="lock-up-account">Đã Hủy</div>
                            ) : (
                              <div
                                className="open-account"
                                onClick={() => handleCancelBill(bill)}
                              >
                                Hủy
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="wrapper-icon">
                            <Link
                              to={`/purchase/${bill._id}`}
                              className="icon bg-color-eye"
                              onClick={() => handleOpenModelDetail(bill)}
                            >
                              <IconIc24FillEye color="lineTertiary" size={14} />
                            </Link>
                            {/* <Link
                              to={`/purchase/${bill._id}`}
                              className="icon bg-color-eye"
                              onClick={() => handleOpenModelUpdate(bill)}
                            >
                              <IconIc24FillPencil
                                color="lineTertiary"
                                size={14}
                              />
                            </Link> */}
                          </div>
                        </td>
                      </tr>
                    );
                  return "";
                })}
            </>
          </tbody>
        </table>
      ) : (
        <div>Bạn chưa mua sản phẩm nào</div>
      )}
      {openModelDetail && listBill.length > 0 && (
        <DetailBillOfSale
          bill={billItem.current}
          setIsCreate={setOpenModelDetail}
          url="/purchase"
        />
      )}
      {openModelUpdate && listBill.length > 0 && (
        <UpdateBillOfSale
          bill={billItem.current}
          setIsUpdate={setOpenModelUpdate}
          url="/purchase"
        />
      )}
    </div>
  );
};

export default PurchaseBuying;
