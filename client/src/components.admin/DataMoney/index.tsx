import React, { useEffect, useState } from "react";

import "./style.css";
import {
  getRevenueByDate,
  getRevenueByDateBought,
  getRevenueByDateBuying,
  getRevenueByDateCancel,
} from "../../services/billOfSale.service";

interface Props {
  dateStart: any;
  dateEnd: any;
}
const DataMoney = ({ dateStart, dateEnd }: Props) => {
  const [revenue, setRevenue] = useState(0);
  const [revenueCancel, setRevenueCancel] = useState(0);
  const [revenueBuying, setRevenueBuying] = useState(0);
  const [revenueBought, setRevenueBought] = useState(0);
  useEffect(() => {
    handleGetRevenueByDate(dateStart, dateEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStart, dateEnd]);
  const handleGetRevenueByDate = async (dateStart, dateEnd) => {
    const data1 = await getRevenueByDate({ dateStart, dateEnd });
    const data2 = await getRevenueByDateCancel({
      dateStart,
      dateEnd,
    });
    const data3 = await getRevenueByDateBought({
      dateStart,
      dateEnd,
    });
    const data4 = await getRevenueByDateBuying({
      dateStart,
      dateEnd,
    });
    setRevenue(data1.data.revenue);
    setRevenueCancel(data2.data.revenue);
    setRevenueBought(data3.data.revenue);
    setRevenueBuying(data4.data.revenue);
  };
  return (
    <div className="wrapper-data">
      <div className="column bg-1">
        <p>{revenue} VND</p>
        <div>Doanh thu</div>
      </div>
      <div className="column bg-2">
        <p>{revenueBuying} VND</p>
        <div>Đang thực hiện</div>
      </div>
      <div className="column bg-3">
        <p>{revenueBought} VND</p>
        <div>Đã hoàn thành</div>
      </div>
      <div className="column bg-4">
        <p>{revenueCancel} VND</p>
        <div>Bị hủy</div>
      </div>
    </div>
  );
};

export default DataMoney;
