import "./style.css";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultModel from "../../../layouts/admin/defaultModel";
import { useDispatch } from "react-redux";
import { getAllSuppliers } from "../../../stores/slices/supplierSlice";
import ChooseProductBillImport from "../../../components.admin/chooseProductBillImport";

interface Props {
  setIsCreate: (val: boolean) => void;
}
const CreateBillImport = ({ setIsCreate }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleBack = () => {
    setIsCreate(false);
    navigate("/admin/quan_ly/hoa_don_nhap");
  };

  useEffect(()=>{
    dispatch(getAllSuppliers())
  },[dispatch])

  return (
    <DefaultModel onClickCancel={handleBack}>
      <div>
        <h3 className="title">Thêm mới hóa đơn nhập</h3>
        <div className="wrapper-create-bill">
          <ChooseProductBillImport handleBack={handleBack}/>
        </div>
      </div>
    </DefaultModel>
  );
};

export default CreateBillImport;
