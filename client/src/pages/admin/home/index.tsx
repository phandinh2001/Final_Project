import React, { useState } from "react";

import WrapperBody from "../../../layouts/admin/wrapperBody";
import DataMoney from "../../../components.admin/DataMoney";
import SelectDatePicker from "../../../components.admin/SelectDatePicker";

import "./style.css";
import ProductBestSale from "../../../components.admin/ProductBestSale";
import ClientBuyBest from "../../../components.admin/ClientBuyBest";
import Inventory from "../../../components.admin/Inventory";
import ChartRevenue from "../../../components.admin/ChartRevenue";
const Home = () => {
  const [dateStartRevenue, setDateStartRevenue] = useState(new Date());
  const [dateEndRevenue, setDateEndRevenue] = useState(new Date());
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [indexTable, setIndexTable] = useState(1);

  const handleNext = () => {
    setIndexTable((prev) => {
      if (prev === 3) return 1;
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setIndexTable((prev) => {
      if (prev === 1) return 3;
      return prev - 1;
    });
  };

  return (
    <WrapperBody isBtn={false}>
      <div className="wrapper-statistical">
        <SelectDatePicker
          dateStart={dateStartRevenue}
          dateEnd={dateEndRevenue}
          setDateStart={setDateStartRevenue}
          setDateEnd={setDateEndRevenue}
          title="Doanh thu cửa hàng"
        />
        <DataMoney dateStart={dateStartRevenue} dateEnd={dateEndRevenue} />
        <ChartRevenue />
        <SelectDatePicker
          dateStart={dateStart}
          dateEnd={dateEnd}
          setDateStart={setDateStart}
          setDateEnd={setDateEnd}
          title="Thống kê"
        />
        <div className="wrapper-best-sale">
          {indexTable === 1 ? (
            <ProductBestSale
              dateStart={dateStart}
              dateEnd={dateEnd}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          ) : indexTable === 2 ? (
            <ClientBuyBest
              dateStart={dateStart}
              dateEnd={dateEnd}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          ) : (
            <Inventory handleNext={handleNext} handlePrev={handlePrev} />
          )}
        </div>
      </div>
    </WrapperBody>
  );
};

export default Home;
