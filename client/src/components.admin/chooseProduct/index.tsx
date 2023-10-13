import { Button, InputField } from "@gapo_ui/components";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconIc24FillArchiveBoxXmark } from "@gapo_ui/icon";

import "./style.css";
import { getAllProduct } from "../../stores/slices/productSlice";
import { RootState } from "../../stores";
import { useInput } from "../../hooks/useInput";
import { validateNumber } from "../../helpers/validator";
import { createBillOfSale } from "../../stores/slices/billOfSaleSlice";

interface Props {
  client?: any;
  name?: string;
  phone?: string;
  address?: string;
  note?: string;
  handleBack: () => void;
}

const ChooseProduct = (props: Props) => {
  const dispatch = useDispatch();
  const { listProduct } = useSelector((state: RootState) => state.products);

  const [message, setMessage] = useState("");

  const [proItem, setProItem] = useState<any>(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const quantity = useInput("1", validateNumber);

  const [listColorAndSize, setListColorAndSize] = useState<any[]>([]);
  const [listSizeAndQuantity, setListSizeAndQuantity] = useState<any[]>([]);
  const [listColor, setListColor] = useState<any[]>([]);
  const [listSize, setListSize] = useState<any[]>([]);
  const [maxQuantity, setMaxQuantity] = useState(0);

  const [listProChoose, setListProChoose] = useState<any[]>([]);
  const [listErr, setListErr] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    if (listProduct && listProduct.length > 0) {
      getColorAndSize(listProduct[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProduct]);

  const handleChooseProduct = () => {
    if (isErr() === false) {
      setListProChoose((prev) => {
        let check: boolean = false;
        let arr: any[] = [];
        if (prev.length > 0 && proItem)
          arr = prev.map((val) => {
            if (
              val.product.Ma === proItem.Ma &&
              val.color === color &&
              val.size === size
            ) {
              check = true;
              return {
                ...val,
                quantity: val.quantity + Number(quantity.value),
              };
            }
            return val;
          });
        if (check) return arr;
        return [
          ...prev,
          {
            product: proItem,
            color,
            size,
            quantity: Number(quantity.value),
          },
        ];
      });
    }
  };
  const isErr = () => {
    if (quantity.err() === true) return true;
    if (Number(quantity.value) > maxQuantity) {
      quantity.setHelperText("số lượng hàng không đủ");
      quantity.setIsErr(true);
      return true;
    }
    if (Number(quantity.value) < 1) {
      quantity.setHelperText("số lượng phải lớn hơn hoặc bằng 1");
      quantity.setIsErr(true);
      return true;
    }
    return false;
  };

  const onChangePro = (e) => {
    const id = e.target.value;
    listProduct.forEach((pro) => {
      if (pro.Ma === Number(id)) getColorAndSize(pro);
    });
  };

  const onChangeColor = (e) => {
    const c = e.target.value;
    let arrSize: any = [];
    let arrSizeAndQuantity: any = [];
    listColorAndSize.forEach((val) => {
      if (val[0] === c) {
        arrSizeAndQuantity = Object.entries(val[1]).map((size, ind) => {
          if (ind === 0) setMaxQuantity(Number(size[1]));
          arrSize.push(size[0]);
          return size;
        });
      }
    });
    setListSize(arrSize);
    setColor(c);
    setSize(arrSize[0]);
    setListSizeAndQuantity(arrSizeAndQuantity);
  };

  const onChangeSize = (e) => {
    const s = e.target.value;
    listSizeAndQuantity.forEach((val) => {
      if (val[0] === s) setMaxQuantity(Number(val[1]));
    });
    setSize(s);
  };

  const onChangeQuantity = (e) => {
    quantity.setValue(e.target.value);
  };

  const getColorAndSize = useCallback((pro: any) => {
    let arrColor: any = [];
    let arrColorAndSize: any = [];
    let arrSizeAndQuantity: any = [];
    let arrSize: any = [];
    arrColorAndSize = Object.entries(pro.KichThuoc_Mau).map((val) => {
      arrColor.push(val[0]);
      return val;
    });
    arrSizeAndQuantity = Object.entries(arrColorAndSize[0][1]).map(
      (val, ind) => {
        if (ind === 0) setMaxQuantity(Number(val[1]));
        arrSize.push(val[0]);
        return val;
      }
    );
    setListColorAndSize(arrColorAndSize);
    setListSizeAndQuantity(arrSizeAndQuantity);
    setListColor(arrColor);
    setListSize(arrSize);
    setProItem(pro);
    setColor(arrColor[0]);
    setSize(arrSize[0]);
  }, []);

  const handleUpdateQuantity = (e, index) => {
    const value = Number(e.target.value);
    e.target.value = value;
    setListProChoose((prev) => {
      return prev.map((val, ind) => {
        if (ind === index) return { ...val, quantity: value };
        return val;
      });
    });
  };

  const handleDeleteProItem = (index) => {
    setListProChoose((prev) => {
      return prev.filter((val, ind) => ind !== index);
    });
  };

  const handleCreateBillOfSale = () => {
    isErrCreateBill();
    let total: number = 0;
    listProChoose.forEach((val) => {
      total +=
        ((val.product.GiaBan * (100 - val.product.KhuyenMai)) / 100) *
        val.quantity;
    });
    if (isErrCreateBill() === false) {
      dispatch(
        createBillOfSale({
          bill: {
            MaKH: props.client.Ma,
            GhiChu: props.note,
            DiaChi: props.address,
            SDTNhan: props.phone,
            TenNguoiNhan: props.name,
            TongTien: total,
            NguoiLap: "QuanLy",
          },
          listProduct: listProChoose,
          navigate: () => {
            alert("thêm hóa đơn thành công");
            props.handleBack();
          },
        })
      );
      setMessage("");
    }
  };

  const isErrCreateBill = () => {
    if (!props.client || !props.name || !props.address || !props.phone) {
      setMessage("bạn phải điền đầy đủ thông tin");
      return true;
    }
    setMessage("");
    const arr: any = [];
    listProChoose.forEach((val, ind) => {
      listProduct.forEach((pro) => {
        if (val.product.Ma === pro.Ma) {
          if (
            pro.KichThuoc_Mau[val.color][val.size] < val.quantity ||
            val.quantity < 1
          )
            arr.push(ind);
        }
      });
    });
    setListErr(arr);
    if (arr.length > 0) return true;
    return false;
  };

  return (
    <>
      <div className="wrapper-choose-product">
        <div className="wrapper-input-name">
          <label className="title-select">Tên Sản Phẩm</label>
          <br />
          <select
            className="select-product"
            id="choose-pro"
            onChange={onChangePro}
          >
            {listProduct &&
              listProduct.map((pro, ind) => (
                <option key={ind} value={pro.Ma}>
                  {pro.Ten}
                </option>
              ))}
          </select>
          <div className="title-select" style={{ marginTop: "10px" }}>
            Tổng số lượng : {maxQuantity}
          </div>
        </div>
        <div className="wrapper-input">
          <label className="title-select">Màu</label>
          <br />
          <select
            className="select-product"
            id="choose-pro"
            onChange={onChangeColor}
            value={color}
          >
            {listColor &&
              listColor.map((color, ind) => (
                <option key={ind} value={color}>
                  {color}
                </option>
              ))}
          </select>
        </div>
        <div className="wrapper-input">
          <label className="title-select">Kích Thước</label>
          <br />
          <select
            className="select-product"
            id="choose-pro"
            onChange={onChangeSize}
            value={size}
          >
            {listSize &&
              listSize.map((size, ind) => (
                <option key={ind} value={size}>
                  {size}
                </option>
              ))}
          </select>
        </div>
        <div className="wrapper-input">
          <InputField
            fullWidth
            label="Số lượng"
            placeholder="Số lượng"
            onChange={onChangeQuantity}
            value={quantity.value}
            helperText={quantity.helperText}
            error={quantity.isErr}
          />
        </div>
        <div className="btn-information" style={{ textAlign: "center" }}>
          <div className="btn">
            <Button color="accentPrimary" onPress={handleChooseProduct}>
              Thêm sản phẩm
            </Button>
          </div>
        </div>
      </div>
      {listProChoose.length > 0 && (
        <div className="wrapper-list-pro">
          <table>
            <thead>
              <tr>
                <th style={{ width: "200px" }}>Sản phẩm</th>
                <th>Màu</th>
                <th>Kích thước</th>
                <th>Giá bán</th>
                <th>Khuyến mại</th>
                <th>Số lượng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listProChoose.map((val, ind) => (
                <tr key={ind}>
                  <td style={{ paddingRight: "10px" }}>{val.product.Ten}</td>
                  <td>{val.color}</td>
                  <td>{val.size}</td>
                  <td>{val.product.GiaBan}</td>
                  <td>{val.product.KhuyenMai}</td>
                  <td
                    style={{
                      // padding: "10px 0",
                      width: "200px",
                      // display: "flex",
                      // flexDirection: "column",
                      // justifyContent: "center",
                      // alignItems:'center'
                    }}
                  >
                    <input
                      value={val.quantity}
                      type="number"
                      onChange={(e) => handleUpdateQuantity(e, ind)}
                      min={1}
                    />
                    {listErr.length > 0 &&
                      listErr.map((val) => {
                        if (val === ind)
                          return (
                            <div className="error">
                              Số lương lớn hơn 0 và bé hơn hoặc bằng số lượng
                              hiện có
                            </div>
                          );
                        return "";
                      })}
                  </td>
                  <td>
                    <div
                      className="icon bg-color-delete"
                      onClick={() => handleDeleteProItem(ind)}
                    >
                      <IconIc24FillArchiveBoxXmark
                        color="lineTertiary"
                        size={14}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {message && (
            <div className="btn-information">
              <div className="btn error">{message}</div>
            </div>
          )}
          <div
            className="btn-information"
            style={{ marginTop: "50px", textAlign: "center" }}
          >
            <div className="btn">
              <Button color="accentPrimary" onPress={handleCreateBillOfSale}>
                Thêm hóa đơn
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChooseProduct;
