import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <hr />
      <footer className="ftco-footer bg-light ftco-section">
        <div className="container">
          <div className="row">
            <div className="mouse" style={{ zIndex: "1" }}>
              <Link to={"#"} className="mouse-icon">
                <div className="mouse-wheel">
                  <span className="ion-ios-arrow-up"></span>
                </div>
              </Link>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2" style={{ fontSize: 30 }}>DPV</h2>
                <ul className="ftco-footer-social list-unstyled float-md-left float-lft">
                  <li className="">
                    <Link to={"#"} style={{ background: 'none' }}>
                      <span style={{ color: 'white', backgroundColor: "#3399ff", borderRadius: 5, padding: 4 }} className="icon-twitter"></span>
                    </Link>
                  </li>
                  <li className="">
                    <Link to={"#"} style={{ background: 'none' }}>
                      <span style={{ color: 'blue', fontSize: 35, marginTop: 3 }} className="icon-facebook"></span>
                    </Link>
                  </li>
                  <li className="">
                    <Link to={"#"} style={{ background: 'none' }}>
                      <span style={{
                        borderRadius: 10,
                        color: '#fff',
                        fontSize: 35,
                        verticalAlign: 'middle',
                        backgroundColor: '#d6249f',
                        background: 'radial - gradient(circle at 30 % 107 %, #fdf497 0 %, #fdf497 5 %, #fd5949 45 %, #d6249f 60 %,#285AEB 90 %)',
                        boxShadow: ' 0px 3px 10px rgba(0,0,0,.25)'
                      }} className="icon-instagram"></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4 ml-md-5">
                <h2 className="ftco-heading-2">Danh sách</h2>
                <ul className="list-unstyled">
                  <li>
                    <Link to={"#"} className="py-2 d-block">
                      Cửa hàng
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} className="py-2 d-block">
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} className="py-2 d-block">
                      Tạp chí
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} className="py-2 d-block">
                      Liên hệ chúng tôi
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">GIÚP ĐỠ</h2>
                <div className="d-flex">
                  <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
                    <li>
                      <Link to={"#"} className="py-2 d-block">
                        Thông tin vận chuyển
                      </Link>
                    </li>
                    <li>
                      <Link to={"#"} className="py-2 d-block">
                        Trả lại &amp; Trao đổi
                      </Link>
                    </li>
                    <li>
                      <Link to={"#"} className="py-2 d-block">
                        Điều khoản và điều kiện
                      </Link>
                    </li>
                    <li>
                      <Link to={"#"} className="py-2 d-block">
                        Chính sách bảo mật
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">CÓ MỘT CÂU HỎI?</h2>
                <div className="block-23 mb-3">
                  <ul>
                    <li>
                      <span className="icon icon-map-marker"></span>
                      <span className="text">
                        Số 10 Khương Trung, Thanh Xuân, Hà Nội
                      </span>
                    </li>
                    <li>
                      <span className="icon icon-phone"></span>
                      <span className="text">0969997483</span>
                    </li>
                    <li>
                      <Link to={"#"}>
                        <span className="icon icon-envelope"></span>
                        <span className="text">phanvandinh492001@gmail.com</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer >
    </>
  );
};

export default Footer;
