import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultModel from "../../layouts/admin/defaultModel";

import ProItem from "./proItem";
import "./style.css";

interface Props {
  setOpenModel: (val: boolean) => void;
  url?: string;
  product: any;
}
const DetailProduct = ({ setOpenModel, url = "", product }: Props) => {
  const navigator = useNavigate();

  const handleBack = () => {
    setOpenModel(false);
    navigator(url);
  };
  return (
    <DefaultModel onClickCancel={handleBack}>
      <>
        <ProItem product={product} />;
      </>
    </DefaultModel>
  );
};

export default DetailProduct;
