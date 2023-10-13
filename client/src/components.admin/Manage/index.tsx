import React, { useState } from "react";
import ItemMenu from "../Menu/ItemMenu/ItemMenu";
import { IconIc24FillArrowheadRight } from "@gapo_ui/icon";
import { IconIc24FillArrowheadDown } from "@gapo_ui/icon";

import "./style.css";
import { config } from "./config";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: any;
  className?: string;
  iconLeft?: any;
  iconRight?: any;
  onClick?: (e?: any) => void;
}
const Manage = ({
  children,
  className,
  iconLeft,
  iconRight,
  onClick,
}: Props) => {
  const [showList, setShowList] = useState("");
  const navigator = useNavigate();
  const [iconState, setIconState] = useState(iconRight);
  const handleManage = () => {
    onClick!();
    if (showList === "") {
      setShowList("animation");
      setIconState(<IconIc24FillArrowheadDown color="lineSecondary" />);
    } else {
      setShowList("");
      setIconState(iconRight);
    }
  };
  const handleNavigator = (url: string) => {
    navigator(`/admin/quan_ly${url}`);
  };
  return (
    <div className={"wrapper-manage"}>
      <ItemMenu
        iconLeft={iconLeft}
        className="item"
        iconRight={iconState}
        children={children}
        onClick={handleManage}
      />
      <div className={`list-manage ${showList}`}>
        {config.map((val, index) => (
          <ItemMenu
            key={index}
            className="item-manage"
            iconLeft={<IconIc24FillArrowheadRight color="lineSecondary" />}
            children={val.children}
            onClick={() => handleNavigator(val.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default Manage;
