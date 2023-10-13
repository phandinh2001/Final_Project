import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CgMicrosoft } from "react-icons/cg";
import "./style.css";

const Social = () => {
  return (
    <div className="social-container">
      <div className="social">
        <FaFacebookF />
      </div>
      <div className="social">
        <FcGoogle />
      </div>
      <div className="social">
        <CgMicrosoft />
      </div>
    </div>
  );
};

export default Social;
