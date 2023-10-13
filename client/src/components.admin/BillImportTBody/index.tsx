import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconIc24FillPaperplane } from "@gapo_ui/icon";
import { IconIc24FillEye } from "@gapo_ui/icon";
import { RootState } from "../../stores";

import "./style.css";
import { cancelBillImport, getAllBillImport, updatePayBillImport, updateStatusBillImport } from "../../stores/slices/billImportSlice";
import { formatDate } from "../../helpers/convert";
import DetailBillImport from "../../modals/detailBillImport";

const listStatus = ["Chưa nhận", "Đã nhận", "Đã hủy"];

const BillImportTBody = () => {
  const dispatch = useDispatch();
  const { listBill } = useSelector((state: RootState) => state.billImport);

  const [openModelDetail, setOpenModelDetail] = useState(false);
  const idBill = useRef("");
  const billItem = useRef(null);

  useEffect(() => {
    dispatch(getAllBillImport());
  }, [dispatch]);

  const handleOpenModelDetail = (bill) => {
    idBill.current = bill._id;
    billItem.current = bill;
    setOpenModelDetail(true);
  };

  const handleCancelBill = (id) => {
    if (window.confirm("Bạn có muốn hủy đơn hàng không?") === true) {
      dispatch(
        cancelBillImport({ id, bill: { Huy: true, TrangThai: 2 } })
      );
    }
  };

  const handleNextStatus = (bill) => {
    dispatch(
      updateStatusBillImport({
        id: bill._id,
        bill: { TrangThai: 1 },
      })
    );
    dispatch(updatePayBillImport({ id:bill._id, bill: { ThanhToan: true } }));
  };
  const handleNextPay = (id) => {
    dispatch(updatePayBillImport({ id, bill: { ThanhToan: true } }));
  };

  return (
    <>
      {listBill &&
        listBill.map((bill, ind) => {
          return (
            <tr key={ind}>
              <td>{bill.MaHD}</td>
              <td>{bill.MaNCC}</td>
              <td>{formatDate(bill.Ngay)}</td>
              <td>{bill.TongTien}</td>
              <td>
                <div className="wrapper-pay-td">
                  <div>
                    {bill.ThanhToan ? "Đã thanh toán" : "chưa thanh toán"}
                  </div>
                  {!bill.ThanhToan && !bill.Huy ? (
                    <div
                      className="next-pay"
                      onDoubleClick={() => handleNextPay(bill._id)}
                    >
                      <IconIc24FillPaperplane size={16} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </td>
              <td>
                <div className="wrapper-status-td">
                  <div>{listStatus[bill.TrangThai]}</div>
                  {bill.TrangThai === 0 && (
                    <div
                      className="next-status"
                      onDoubleClick={() => handleNextStatus(bill)}
                    >
                      <IconIc24FillPaperplane size={16} />
                    </div>
                  )}
                </div>
              </td>
              <td>
                {bill.TrangThai !== 1 ? (
                  <div>
                    {bill.Huy ? (
                      <div className="lock-up-account">Đã Hủy</div>
                    ) : (
                      <div
                        className="open-account"
                        onClick={() => handleCancelBill(bill._id)}
                      >
                        Hủy
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </td>
              <td>
                <div className="wrapper-icon">
                  <Link
                    to={`/admin/quan_ly/hoa_don_nhap`}
                    className="icon bg-color-eye"
                    onClick={() => handleOpenModelDetail(bill)}
                  >
                    <IconIc24FillEye color="lineTertiary" size={14} />
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
        <tr>
        <td>
          {openModelDetail && listBill.length > 0 && (
            <DetailBillImport
              bill={billItem.current}
              setIsCreate={setOpenModelDetail}
              url="/admin/quan_ly/hoa_don_nhap"
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default BillImportTBody;
