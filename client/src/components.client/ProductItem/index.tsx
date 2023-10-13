import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import { RootState } from "../../stores";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDetailCategoryItem } from "../../stores/slices/detailCategorySlice";
import { convertSex } from "../../helpers/convert";
import { getBrandItem } from "../../stores/slices/brandSlice";
import { getSupplierItem } from "../../stores/slices/supplierSlice";
import { getDetailProItem } from "../../stores/slices/detailProSlice";

import "./style.css";
import { Button, InputField } from "@gapo_ui/components";
import { useInput } from "../../hooks/useInput";
import { validateNumber } from "../../helpers/validator";
import { clearMessage, setMessage } from "../../stores/slices/messageSlice";
import { useNavigate } from "react-router-dom";
import { getClientItemByPhone } from "../../stores/slices/clientSlice";
import {
  createCartItem,
  getCartByIdClient,
  updateCart,
} from "../../stores/slices/cartSlice";

interface Props {
  product: any;
}
const ProductItem = ({ product }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quantityBuy = useInput("1", validateNumber);

  const [indexColor, setIndexColor] = useState(-1);
  const [indexSize, setIndexSize] = useState(-1);

  const [selectColor, setSelectColor] = useState("");
  const [selectSize, setSelectSize] = useState("");

  const [size, setSize] = useState<string[]>([]);
  const [objectSize, setObjectSize] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(product.SoLuong);
  const category = useSelector(
    (state: RootState) => state.detailCategory.detailCategoryItem
  );
  const { message } = useSelector((state: RootState) => state.message);
  const user = useSelector((state: RootState) => state.user);
  const brand = useSelector((state: RootState) => state.brands.brandItem);
  const { clientItem } = useSelector((state: RootState) => state.clients);
  const supplier = useSelector(
    (state: RootState) => state.suppliers.supplierItem
  );
  const { detailProItem } = useSelector((state: RootState) => state.detailPro);
  const { listCart } = useSelector((state: RootState) => state.cart);
    
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

  useEffect(() => {
    if (user.isLoggedIn) dispatch(getClientItemByPhone(user.phone));
  }, [dispatch, user.isLoggedIn, user.phone]);

  useEffect(() => {
    if (clientItem) dispatch(getCartByIdClient(clientItem.Ma));
  }, [clientItem, dispatch]);

  const handleClickColor = (value: any, ind, color) => {
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
    setSelectColor(color);
    setSelectSize("");
  };

  const handleClickSize = (value: string, ind) => {
    if (objectSize)
      for (let key in objectSize) {
        if (key === value) setQuantity(objectSize[key]);
      }
    setIndexSize(ind);
    setSelectSize(value);
  };

  const onChangeQuantityBuy = (e) => {
    quantityBuy.setValue(e.target.value);
  };
  const handleAddToCart = () => {
    if (isErr() === false) {
      if (user.isLoggedIn === false) {
        navigate("/login");
      } else {
        const proSelected = isProductInCart();
        if (!proSelected.check) {
          dispatch(
            createCartItem({
              cartItem: {
                MaKH: clientItem.Ma,
                MaSP: product.Ma,
                Mau: selectColor,
                KichThuoc: selectSize,
                SoLuong: Number(quantityBuy.value),
                DonGia: (product.GiaBan * (100 - product.KhuyenMai)) / 100,
              },
              navigate: () => {
                alert("thêm vào giỏ hàng thành công");
              },
            })
          );
        } else if (
          quantity >=
          Number(quantityBuy.value) + proSelected.quantity
        ) {
          dispatch(
            updateCart({
              id: proSelected.idCart,
              cart: {
                SoLuong: Number(quantityBuy.value) + proSelected.quantity,
              },
            })
          );
          alert("thêm vào giỏ hàng thành công");
        } else
          alert(
            "Số lượng trong cửa hàng và số lượng chọn vượt quá số lượng sản phẩm"
          );
      }
      dispatch(clearMessage());
    }
  };

  const isProductInCart = () => {
    let check: boolean = false;
    let idCart = null;
    let quantity = 0;
    listCart.forEach((cart) => {
      if (
        cart.MaSP === product.Ma &&
        cart.Mau === selectColor &&
        cart.KichThuoc === selectSize
      ) {
        check = true;
        idCart = cart._id;
        quantity = cart.SoLuong;
      }
    });
    return {
      check,
      idCart,
      quantity,
    };
  };
  const isErr = () => {
    if (quantityBuy.err() === true) {
      dispatch(clearMessage());
      return true;
    }
    if (Number(quantityBuy.value) > quantity) {
      quantityBuy.setHelperText("số lượng hàng không đủ");
      quantityBuy.setIsErr(true);
      return true;
    }
    if (Number(quantityBuy.value) < 1) {
      quantityBuy.setHelperText("số lượng phải lớn hơn hoặc bằng 1");
      quantityBuy.setIsErr(true);
      return true;
    }
    if (!selectColor || !selectSize) {
      dispatch(setMessage("Phải chọn hết thông tin"));
      return true;
    }
    dispatch(clearMessage());
    return false;
  };
  const handleBack = () => {
    navigate("/shop");
  };
  return (
    <div>
      <div className="container-add-cart">
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
                    width: "200px",
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
                <td>Đơn giá: </td>
                <td>
                  {product.KhuyenMai > 0 ? (
                    <div className="wrapper-price">
                      <div className="item-price">
                        {product.GiaBan -
                          (product.GiaBan * product.KhuyenMai) / 100}
                        đ
                      </div>
                      <del className="item-price" style={{ color: "gray" }}>
                        {product.GiaBan}đ
                      </del>
                    </div>
                  ) : (
                    <>{product.GiaBan}đ</>
                  )}
                </td>
              </tr>
              <tr>
                <td>Sản phẩm đang có:</td>
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
                          onClick={() => handleClickColor(val[1], ind, val[0])}
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
                          className={indexSize === ind ? `item active` : "item"}
                          onClick={() => handleClickSize(val, ind)}
                        >
                          {val}
                        </div>
                      ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td>Số lượng:</td>
                <td>
                  <div className="wrapper-input">
                    <InputField
                      placeholder="Số lượng"
                      onChange={onChangeQuantityBuy}
                      value={quantityBuy.value}
                      helperText={quantityBuy.helperText}
                      error={quantityBuy.isErr}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <div className="error" style={{ textAlign: "left" }}>
                    {message}
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <div className="btn" style={{ marginTop: "30px" }}>
                    <Button color="accentPrimary" onPress={handleAddToCart}>
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                  <div className="btn" style={{ marginTop: "30px" }}>
                    <Button onPress={handleBack}>Quay lại</Button>
                  </div>
                </td>
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
    </div>
  );
};

export default ProductItem;
