import React from "react";

import "./style.itemMenu.css";
interface Props {
  children?: any;
  className?: string;
  iconLeft?: any;
  iconRight?: any;
  onClick?: (e?: any) => void;
}
const ItemMenu = ({
  children,
  className,
  iconLeft,
  iconRight,
  onClick,
}: Props) => {
  return (
    <div className={className} onClick={onClick}>
      <div className="wrapper-children-item-menu">
        <div className="icon-left">{iconLeft}</div>
        <div className="children">{children}</div>
        <div className="icon-right">{iconRight}</div>
      </div>
    </div>
  );
};

export default ItemMenu;
