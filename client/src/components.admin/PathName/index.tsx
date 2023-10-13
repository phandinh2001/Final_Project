import React from "react";
import { IconIc24FillChevronRight } from "@gapo_ui/icon";
import "./style.css";
import { useLocation } from "react-router-dom";
import { convertPathName } from "../../helpers/pathName";

const PathName = () => {
  const location = useLocation();
  const arrPathName = convertPathName(location.pathname);
  return (
    <div className="wrapper-pathname">
      {arrPathName.map((val, index) => {
        if (index === arrPathName.length - 1)
          return (
            <span key={index}>
              <IconIc24FillChevronRight UNSAFE_style={{ paddingTop: "7px" }} />
              <span style={{ fontWeight: "900" }}>{val}</span>
            </span>
          );
        return (
          <span key={index}>
            <IconIc24FillChevronRight UNSAFE_style={{ paddingTop: "7px" }} />
            <span>{val}</span>
          </span>
        );
      })}
    </div>
  );
};

export default PathName;
