import React, { useState, useEffect, useRef } from "react";
import DetailBillOfSale from "../../modals/detailBillOfSale";
import { IconIc24FillEye } from "@gapo_ui/icon";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import {  getBillOfSaleOfClientOrderByIdClient } from "../../stores/slices/billOfSaleSlice";

interface Props {
  idClient: number;
}

const PurchaseCancelled = ({ idClient }: Props) => {
  const dispatch = useDispatch();
  const { listBill } = useSelector((state: RootState) => state.billOfSale);
  const [openModelDetail, setOpenModelDetail] = useState(false);
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
        if (bill.TrangThai === "Đã hủy")
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

  return (
    <div>
      {lengthListBill > 0 ? (
        <table>
          <thead>
            <tr>
              <th style={{textAlign: 'center'}}>Ngày lập</th>
              <th style={{textAlign: 'center'}}>Tổng tiền</th>
              <th style={{textAlign: 'center'}}>Thanh toán</th>
              <th style={{textAlign: 'center'}}>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <>
              {listBill &&
                listBill.map((bill, ind) => {
                  if (bill.TrangThai === "Đã hủy")
                    return (
                      <tr key={ind}>
                        <td style={{textAlign: 'center'}}>{new Date(bill.Ngay).toLocaleDateString()}</td>
                        <td style={{textAlign: 'center'}}>{bill.TongTien}</td>
                        <td style={{textAlign: 'center'}}>
                          <div>
                            <div>
                              {bill.ThanhToan
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"}
                            </div>
                          </div>
                        </td>
                        <td style={{textAlign: 'center'}}>
                          <div>
                            <div>{bill.TrangThai}</div>
                          </div>
                        </td>
                        <td>
                          <div className="wrapper-icon">
                            <Link
                              to={`/purchase/${bill._id}`}
                              className="icon bg-color-eye"
                              style={{ margin: "5px 0" }}
                              onClick={() => handleOpenModelDetail(bill)}
                            >
                              <IconIc24FillEye color="lineTertiary" size={14} />
                            </Link>
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
        <div>Bạn chưa hủy đơn hàng nào</div>
      )}
      {openModelDetail && listBill.length > 0 && (
        <DetailBillOfSale
          bill={billItem.current}
          setIsCreate={setOpenModelDetail}
          url="/purchase"
        />
      )}
    </div>
  );
};

export default PurchaseCancelled;
