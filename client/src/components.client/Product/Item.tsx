import React from "react";
import { Link } from "react-router-dom";
interface Props {
  product: any;
  sold?: number;
}
const Item = ({ product, sold = 0 }: Props) => {
  return (
    <div className="colum" style={{ margin: "0px 15px" }}>
      <div className="product" style={{ width: "250px" }}>
        <Link to={"/shop/" + product._id} className="img-prod">
          <img
            className="img-fluid"
            src={`/assets/img_product/${product.Anh[0]}`}
            alt={`product.Img`}
          />
          {product.KhuyenMai > 0 && (
            <span className="status">{product.KhuyenMai}%</span>
          )}

          <div className="overlay"></div>
        </Link>
        <div className="text py-3 px-3">
          <Link to={"/shop/" + product._id} className="product-name">
            {product.Ten}
          </Link>
          <div className="d-flex">
            <div className="pricing">
              <div className="price">
                <span className="price-sale">
                  {(product.GiaBan * (100 - product.KhuyenMai)) / 100}
                  VND
                </span>
              </div>
            </div>
            <div className="rating">
              <p className="text-right">Đã bán : {sold}</p>
            </div>
          </div>
          <p className="bottom-area d-flex mt-2" >
            <Link
              to={"/shop/" + product._id}
              className="add-to-cart text-center py-2 mr-1"
            >
              Thêm vào giỏ hàng +
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
