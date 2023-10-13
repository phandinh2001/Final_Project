import React from "react";
import about from "../../../assets/images/about.jpg";

const Section_2 = () => {
  return (
    <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
      <div className="container">
        <div className="row">
          <div
            className="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center"
            style={{ backgroundImage: `url(${about})` }}
          >
            <a
              href="https://vimeo.com/45830194"
              className="icon popup-vimeo d-flex justify-content-center align-items-center"
            >
              <span className="icon-play"></span>
            </a>
          </div>
          <div className="col-md-7 py-5 wrap-about pb-md-5 ">
            <div className="heading-section-bold mb-4 mt-md-5">
              <div className="ml-md-0">
                <h2 className="mb-4">Cách tốt hơn để vận chuyển sản phẩm của bạn</h2>
              </div>
            </div>
            <div className="pb-md-5">

              <div className="row ftco-services">
                <div className="col-lg-4 text-center d-flex align-self-stretch ">
                  <div className="media block-6 services">
                    <div className="icon d-flex justify-content-center align-items-center mb-4">
                      <span className="flaticon-002-recommended"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading">CHÍNH SÁCH HOÀN TIỀN</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 text-center d-flex align-self-stretch ">
                  <div className="media block-6 services">
                    <div className="icon d-flex justify-content-center align-items-center mb-4">
                      <span className="flaticon-001-box"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading">BAO BÌ CAO CẤP</h3>   
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 text-center d-flex align-self-stretch ">
                  <div className="media block-6 services">
                    <div className="icon d-flex justify-content-center align-items-center mb-4">
                      <span className="flaticon-003-medal"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading">CHẤT LƯỢNG CAO</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Section_2;
