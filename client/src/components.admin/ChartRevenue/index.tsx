import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getDataChartOfBillOfSale } from "../../stores/slices/billOfSaleSlice";
import { RootState } from "../../stores";

const ChartRevenue = () => {
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { dataChart } = useSelector((state: RootState) => state.billOfSale);

  useEffect(() => {
    if (selectedYear) dispatch(getDataChartOfBillOfSale(selectedYear));
  }, [dispatch, selectedYear]);

  const handleYearChange = (date) => {
    setSelectedYear(date.getFullYear());
  };
  return (
    <div className="wrapper-chart">
      <div className="header-chart">
        <div className="title-chart">Biểu đồ doanh thu</div>
        <div className="line-chart"></div>
        <div className="select-year">
          <DatePicker
            selected={new Date(selectedYear, 0, 1)}
            onChange={handleYearChange}
            dateFormat="yyyy"
            showYearPicker
            scrollableYearDropdown
            maxDate={new Date()}
          />
        </div>
      </div>
      {dataChart.length > 0 && (
        <LineChart width={800} height={300} data={dataChart}>
          <Line
            type="monotone"
            dataKey="Đang thực hiện"
            stroke="#FFCA29"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="Hoàn thành"
            stroke="#2196F3"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="Hủy"
            stroke="#F44236"
            strokeWidth={3}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      )}
    </div>
  );
};

export default ChartRevenue;
