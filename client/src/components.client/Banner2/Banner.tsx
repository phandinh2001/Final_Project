import React from "react";
import { Link } from "react-router-dom";
import bg_6 from "../../assets/images/contact_bgr_2.jpg";
interface Props{
    title?:string,
    bread?:string
    backgroundImg?:string
    fun?:(a,b)=>void
}
const Banner2 = ({title="",bread="",backgroundImg=bg_6}:Props) => {
  const func = (a,b)=>{
    return a+b
  }
  console.log(func(6,7));
  
  return (
    <div
      className="hero-wrap hero-bread"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center">
          <div className="col-md-9 text-center">
            <p className="breadcrumbs">
              <span className="mr-2">
                <Link to={"/"}><b style={{color: '#E0E0E0'}}>Trang chủ</b></Link>
              </span>
              <span style={{color:  '#E0E0E0'}}>{title}</span>
            </p>
            <h1 className="mb-0 bread" style={{fontFamily: "Open Sans", color:  '#E0E0E0'}}>{bread}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
