/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import about_1 from "../../../assets/images/about-1.jpg";
import about_2 from "../../../assets/images/ney-1.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Section_1 = () => {

  const navigate = useNavigate();
  const handleGotoShop = () => {
    navigate("/shop")
  };

  return (
    <section className="ftco-section ftco-choose ftco-no-pb ftco-no-pt">
      <div className="container">
        <div className="row">
          <div className="col-md-8 d-flex align-items-stretch">
            <div
              className="img"
              style={{ backgroundImage: `url(${about_1})` }}
            ></div>
          </div>
          <div className="col-md-4 py-md-5 ">
            <div className="text py-3 py-md-5">
              <h2 className="mb-4">
                Bộ sưu tập quần áo mới dành cho nam và nữ 2023
              </h2>
              <p>
                <a href="#" className="btn btn-white px-4 py-3" onClick={handleGotoShop}>
                  Mua ngay
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5 order-md-last d-flex align-items-stretch">
            <div
              className="img img-2"
              style={{ backgroundImage: `url(${about_2})` }}
            ></div>
          </div>
          <div className="col-md-7 py-3 py-md-5 ">
            <div className="text text-2 py-md-5">
              <h2 className="mb-4">
                Mua sắm dễ dàng, tiết kiệm thời gian cùng với DPV
              </h2>
              <p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section_1;
