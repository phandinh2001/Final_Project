import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { compareDate } from "../../helpers/compare";
import "./style.css";
interface Props {
  dateStart: any;
  dateEnd: any;
  setDateStart: (val: any) => void;
  setDateEnd: (val: any) => void;
  title?: string;
}
const SelectDatePicker = ({
  dateStart,
  dateEnd,
  setDateStart,
  setDateEnd,
  title = "",
}: Props) => {
  const onChangeDateStart = (date) => {
    setDateStart(date);
  };
  const onChangeDateEnd = (date) => {
    setDateEnd(date);
    if (compareDate(dateStart, date) === 1) setDateStart(date);
  };
  return (
    <div className="wrapper-date-picker">
      <div className="title">{title}</div>
      <div className="line-date"></div>
      <div className="date-picker">
        <div>
          <DatePicker
            selected={dateStart}
            onChange={onChangeDateStart}
            onKeyDown={(e) => e.preventDefault()}
            dateFormat="dd/MM/yyyy"
            maxDate={dateEnd}
          />
        </div>
        <span>Đến</span>
        <div>
          <DatePicker
            selected={dateEnd}
            onChange={onChangeDateEnd}
            onKeyDown={(e) => e.preventDefault()}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectDatePicker;
