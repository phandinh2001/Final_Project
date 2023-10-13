import React from "react";
import { IconIc24FillChevronRightCircle } from "@gapo_ui/icon";
import { IconIc24FillChevronLeftCircle } from "@gapo_ui/icon";

import "./style.css";
interface Props {
  children: any;
  title?: string;
  handleNext?: () => void;
  handlePrev?: () => void;
}
const WrapperTableHome = ({
  children,
  title = "",
  handleNext = () => {},
  handlePrev = () => {},
}: Props) => {
  return (
    <div className="wrapper-product-best-sale">
      <div className="wrapper-title">
        <div onClick={handlePrev}>
          <IconIc24FillChevronLeftCircle />
        </div>
        <h6 className="title">{title}</h6>
        <div onClick={handleNext}>
          <IconIc24FillChevronRightCircle />
        </div>
      </div>

      <div className="product-best-sale">
        <div className="list-product">
          <>{children}</>
        </div>
      </div>
    </div>
  );
};
export default WrapperTableHome;
