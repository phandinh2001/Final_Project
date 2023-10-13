import React from "react";
import { IconIc24FillXmark } from "@gapo_ui/icon";

import "./style.css";
interface Props {
  children: JSX.Element;
  onClickCancel: () => void;
}
const DefaultModel = ({ children, onClickCancel }: Props) => {
  return (
    <>
      <div className="wrapper-model">
        <div className="wrapper-context">
          <div onClick={onClickCancel} className="cancel-detail">
            <IconIc24FillXmark color="lineTertiary" size={20} />
          </div>
          <div className="wrapper-children">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultModel;
