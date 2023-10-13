import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./style.css";
import DefaultModel from "../../layouts/admin/defaultModel";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { formatDate } from "../../helpers/convert";
import { getSupplierItem } from "../../stores/slices/supplierSlice";
import { getDetailBillImportByIdBill } from "../../stores/slices/detailBillImportSlice";
import { getAllProduct } from "../../stores/slices/productSlice";

interface Props {
  bill: any;
  setIsCreate: (val: boolean) => void;
  url?: string;
}

const listStatus = ["Chưa nhận", "Đã nhận", "Đã hủy"];

const DetailBillImport = ({ bill, setIsCreate, url = "" }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { listDetailBill } = useSelector(
    (state: RootState) => state.detailBillImport
  );
  const { supplierItem } = useSelector((state: RootState) => state.suppliers);
  const { listProduct } = useSelector((state: RootState) => state.products);

  const handleBack = () => {
    setIsCreate(false);
    navigate(url);
  };


  useEffect(() => {
    dispatch(getSupplierItem(bill.MaNCC));
    dispatch(getDetailBillImportByIdBill(bill.MaHD));
    dispatch(getAllProduct());
  }, [bill.MaHD, bill.MaNCC, dispatch]);

  return (
    <DefaultModel onClickCancel={handleBack}>
      <div className="container-bill-of-sale">
        <div className="wrapper-content">
          <div className="wrapper-bill">
            <div className="bill">Hóa đơn :</div>
            <div className="row-detail-bill">
              <div className="column-1">Mã hóa đơn</div>
              <div>: {bill.MaHD}</div>
            </div>
            {supplierItem && (
              <div className="row-detail-bill">
                <div className="column-1">Nhà cung cấp</div>
                <div>: {supplierItem.Ten}</div>
              </div>
            )}

            <div className="row-detail-bill">
              <div className="column-1">Ngày lập hóa đơn</div>
              <div>: {formatDate(bill.Ngay)}</div>
            </div>
            <div className="row-detail-bill">
              <div className="column-1">Tổng tiền</div>
              <div>: {bill.TongTien}</div>
            </div>
            <div className="row-detail-bill">
              <div className="column-1">Thanh toán</div>
              <div>
                : {bill.ThanhToan ? "Đã thanh toán" : "Chưa thanh toán"}
              </div>
            </div>
            <div className="row-detail-bill">
              <div className="column-1">Trạng thái </div>
              <div>: {listStatus[bill.TrangThai]}</div>
            </div>
          </div>
        </div>
        {listDetailBill.length > 0 && (
          <div className="wrapper-detail-bill">
            <div className="detail-bill">Chi tiết hóa đơn:</div>
            <table>
              <thead>
                <tr>
                  <th>Mã</th>
                  <th style={{ width: "300px" }}>Tên sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Màu</th>
                  <th>Kích thước</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {listDetailBill.map((detailBill, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{detailBill.MaSP}</td>
                      <td style={{ padding: "5px 0" }}>
                        {listProduct &&
                          listProduct.map((pro, i) => {
                            if (pro.Ma === detailBill.MaSP)
                              return <div key={i}>{pro.Ten}</div>;
                            return <div key={i}></div>;
                          })}
                      </td>
                      <td>{detailBill.DonGia}</td>
                      <td>{detailBill.SoLuong}</td>
                      <td>{detailBill.Mau}</td>
                      <td>{detailBill.KichThuoc}</td>
                      <td>{detailBill.ThanhTien}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DefaultModel>
  );
};

export default DetailBillImport;
