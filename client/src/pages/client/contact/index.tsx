/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import Banner2 from "../../../components.client/Banner2/Banner";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <Banner2 title="Liên hệ" bread="LIÊN HỆ CHÚNG TÔI" />
      <section className="ftco-section contact-section bg-light">
        <div className="container">
          <div className="row d-flex mb-5 contact-info">
            <div className="w-100"></div>
            <div className="col-md-3 d-flex">
              <div className="info bg-white p-4">
                <p>
                  <span>Địa chỉ:</span> Số 10 Khương Trung, Thanh Xuân,  Hà Nội
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="info bg-white p-4">
                <p>
                  <span>Số điện thoại:</span>{" "}
                  <a href="tel://1234567920">0969997483</a>
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="info bg-white p-4">
                <p>
                  <span>Email:</span>{" "}
                  <a href="mailto:info@yoursite.com">dinhpv@gmail.com</a>
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="info bg-white p-4">
                <p>
                  <span>Trang web : </span> <Link to={"#"}>dpv.com</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
