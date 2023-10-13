import React from "react";
import { Navigate } from "react-router";

const PrivateRouterAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")!);
  return user && user.position === "QuanLy" ? (
    <> {children} </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default PrivateRouterAdmin;
