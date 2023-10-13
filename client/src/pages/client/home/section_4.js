import React, { Component } from "react";

import bg_4 from "../../../assets/images/bg_4.jpg";
class Section_4 extends Component {
  constructor() {
    super();
    this.handleNumber = this.handleNumber.bind(this);
    this.numbers = document.getElementsByClassName("number");
  }
  componentDidMount() {
    for (let i = 0; i < this.numbers.length; i++) {
      this.handleNumber(this.numbers[i]);
    }
  }
  handleNumber = (number) => {
    const data_number = Number(number.getAttribute("data-number"));
    let count = 0;
    const time = (data_number) => {
      if (data_number === 100) return 50;
      return 5;
    };
    const runNumber = setInterval(() => {
      number.innerHTML = count++;
      if (count === data_number + 1) clearInterval(runNumber);
    }, time(data_number));
  };
  render() {
    return (
      <>
        <section
          className="ftco-section ftco-counter img"
          id="section-counter"
          style={{ backgroundImage: `url(${bg_4})` }}
        >
          <div className="container">
            <div className="row justify-content-center py-5">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-3 d-flex justify-content-center counter-wrap ">
                    <div className="block-18 text-center">
                      <div className="text">
                        {/* <strong className="number" data-number="1000">
                          0
                        </strong> */}
                        <span>Vận chuyển miễn phí</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center counter-wrap ">
                    <div className="block-18 text-center">
                      <div className="text">
                        {/* <strong className="number" data-number="100">
                          0
                        </strong> */}
                        <span>Đa dạng nhãn hiệu</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center counter-wrap ">
                    <div className="block-18 text-center">
                      <div className="text">
                        {/* <strong className="number" data-number="1000">
                          0
                        </strong> */}
                        <span>Ưu đãi lớn</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center counter-wrap ">
                    <div className="block-18 text-center">
                      <div className="text">
                        {/* <strong className="number" data-number="100">
                          0
                        </strong> */}
                        <span>Hoàn trả hàng </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
      </>
    );
  }
}

export default Section_4;
