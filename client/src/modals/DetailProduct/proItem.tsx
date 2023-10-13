import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../../components/Slider";
import { RootState } from "../../stores";
import { getDetailCategoryItem } from "../../stores/slices/detailCategorySlice";
import { convertSex } from "../../helpers/convert";
import { getBrandItem } from "../../stores/slices/brandSlice";
import { getSupplierItem } from "../../stores/slices/supplierSlice";
import { getDetailProItem } from "../../stores/slices/detailProSlice";
interface Props {
  product: any;
}
const ProItem = ({ product }: Props) => {
  const dispatch = useDispatch();

  const [size, setSize] = useState<string[]>([]);
  const [objectSize, setObjectSize] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(product.SoLuong);
  const category = useSelector(
    (state: RootState) => state.detailCategory.detailCategoryItem
  );
  const brand = useSelector((state: RootState) => state.brands.brandItem);
  const supplier = useSelector(
    (state: RootState) => state.suppliers.supplierItem
  );
  const { detailProItem } = useSelector((state: RootState) => state.detailPro);

  const [indexColor, setIndexColor] = useState(-1);
  const [indexSize, setIndexSize] = useState(-1);

  useEffect(() => {
    const objectSize = Object.entries(product.KichThuoc_Mau).map(
      (val) => val[1]
    );
    const arrSize: string[] = [];
    objectSize.forEach((val) => {
      Object.keys(val!).forEach((size) => {
        if (arrSize.indexOf(size) < 0) arrSize.push(size);
      });
    });
    setSize(arrSize);
  }, [product.KichThuoc_Mau]);

  useEffect(() => {
    dispatch(getDetailCategoryItem(product.MaLoai));
    dispatch(getBrandItem(product.MaThuongHieu));
    dispatch(getSupplierItem(product.MaNCC));
    dispatch(getDetailProItem(product.Ma));
  }, [
    dispatch,
    product.Ma,
    product.MaLoai,
    product.MaNCC,
    product.MaThuongHieu,
  ]);

  const handleClickColor = (value: any, ind: number) => {
    let count: number = 0;
    const sizeOfColor: string[] = [];
    Object.entries(value).forEach((val) => {
      sizeOfColor.push(val[0]);
      count += Number(val[1]!);
    });
    setSize(sizeOfColor);
    setQuantity(count);
    setObjectSize(value);
    setIndexColor(ind);
    setIndexSize(-1);
  };

  const handleClickSize = (value: string, ind: number) => {
    if (objectSize)
      for (let key in objectSize) {
        if (key === value) setQuantity(objectSize[key]);
      }
    setIndexSize(ind);
  };
  return (
    <>
      <div className="container-detail">
        <div className="wrapper-image">
          <div className="wrapper-slider">
            {product.KhuyenMai > 0 && (
              <div className="promotion">{product.KhuyenMai}%</div>
            )}
            <Slider
              slideImg={product.Anh}
              url="/assets/img_product/"
              size={320}
              navigation={true}
            />
          </div>
          <div className="list-image">
            {product.Anh.map((img, ind) => {
              return (
                <img
                  key={ind}
                  src={`/assets/img_product/${img}`}
                  alt={img}
                  width={80}
                  height={80}
                />
              );
            })}
          </div>
        </div>
        <div className="detail-product">
          <h4>{product.Ten}</h4>
          <table>
            <thead>
              <tr>
                <th
                  className="th-pro-item"
                  style={{
                    width: "130px",
                  }}
                ></th>
                <th className="th-pro-item"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Loại: </td>
                <td>{category && category.Ten}</td>
              </tr>
              <tr>
                <td>Giá bán: </td>
                <td>
                  {product.KhuyenMai > 0 ? (
                    <div className="wrapper-price">
                      <div className="item-price">
                        {product.GiaBan -
                          (product.GiaBan * product.KhuyenMai) / 100}
                        <span> VND</span>
                      </div>
                      <del className="item-price" style={{ color: "gray" }}>
                        {product.GiaBan} VND
                      </del>
                    </div>
                  ) : (
                    <>{product.GiaBan} VND</>
                  )}
                </td>
              </tr>
              <tr>
                <td>Giá Nhập:</td>
                <td>{product.GiaNhap} VND</td>
              </tr>
              <tr>
                <td>Màu sắc:</td>
                <td>
                  <div className="wrapper-color">
                    {Object.entries(product.KichThuoc_Mau).map((val, ind) => {
                      return (
                        <div
                          key={ind}
                          className={
                            indexColor === ind ? `item active` : "item"
                          }
                          onClick={() => handleClickColor(val[1], ind)}
                        >
                          {val[0]}
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
              <tr>
                <td>Kích cỡ:</td>
                <td>
                  <div className="wrapper-size">
                    {size &&
                      size.map((val, ind) => (
                        <div
                          key={ind}
                          className={
                            indexSize === ind ? `item active` : "item"
                          }
                          onClick={() => handleClickSize(val,ind)}
                        >
                          {val}
                        </div>
                      ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td>Số lượng:</td>
                <td>{quantity}</td>
              </tr>
              <tr>
                <td>Giới tính:</td>
                <td>{convertSex(product.GioiTinh)}</td>
              </tr>
              <tr>
                <td>Thương hiệu:</td>
                <td>{brand && brand.Ten}</td>
              </tr>
              <tr>
                <td>Nhà cung cấp:</td>
                <td>{supplier && supplier.Ten}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="content-detail-product">
        {detailProItem && (
          <>
            <h2>Chi tiết sản phẩm</h2>
            <div
              dangerouslySetInnerHTML={{ __html: detailProItem.ChiTiet }}
            ></div>
          </>
        )}
        {product.MoTa && (
          <>
            <h2>Mô tả sản phẩm</h2>
            <div dangerouslySetInnerHTML={{ __html: product.MoTa! }}></div>
          </>
        )}
      </div>
    </>
  );
};

export default ProItem;
