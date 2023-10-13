import React from "react";
import { Navigate } from "react-router";

const PrivateRouterClient = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")!);

  return user && user.position === "QuanLy" ? (
    <Navigate to={"/admin"} />
  ) : (
    <> {children} </>
  );
};

export default PrivateRouterClient;
