import React from "react";
import "./style.css";
interface Props {
  title?: string;
}
const Explain = ({ title }: Props) => {
  return (
    <div className="wrapper-explain">
      <div className="arrow-up"></div>
      <div className="title">{title}</div>
    </div>
  );
};

export default Explain;
