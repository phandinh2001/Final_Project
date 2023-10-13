import React from "react";

import "./style.css";
import { Button } from "@gapo_ui/components";
interface Props {
  children?: JSX.Element;
  onClickBtn?: () => void;
  title?: string;
  isBtn?: boolean;
}
const WrapperBody = ({ children, onClickBtn, title, isBtn = true }: Props) => {
  return (
    <div className="wrapper-container">
      <div className="wrapper-table">
        {title && (
          <div className="title-table">
            <div>{title}</div>
            {isBtn && (
              <Button
                type="button"
                color="positivePrimary"
                size="medium"
                onPress={onClickBtn}
              >
                Thêm mới
              </Button>
            )}
          </div>
        )}
        <>{children}</>
      </div>
    </div>
  );
};
export default WrapperBody;
