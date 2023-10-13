import { Button, InputField } from "@gapo_ui/components";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconIc24FillArchiveBoxXmark } from "@gapo_ui/icon";

import "./style.css";
import { getProductsByIdOfSupplier } from "../../stores/slices/productSlice";
import { RootState } from "../../stores";
import { useInput } from "../../hooks/useInput";
import { validateNumber } from "../../helpers/validator";
import { getAllSuppliers } from "../../stores/slices/supplierSlice";
import { createBillImport } from "../../stores/slices/billImportSlice";

interface Props {
  handleBack: () => void;
}

const ChooseProductBillImport = (props: Props) => {
  const dispatch = useDispatch();
  const { listProduct } = useSelector((state: RootState) => state.products);
  const { listSupplier } = useSelector((state: RootState) => state.suppliers);

  const [idSup, setIdSup] = useState<any>(null);
  const [disableSelectSup, setDisableSelectSup] = useState<boolean>(false);

  const [proItem, setProItem] = useState<any>(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const quantity = useInput("1", validateNumber);

  const [listColorAndSize, setListColorAndSize] = useState<any[]>([]);
  const [listColor, setListColor] = useState<any[]>([]);
  const [listSize, setListSize] = useState<any[]>([]);

  const [listProChoose, setListProChoose] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllSuppliers());
  }, [dispatch]);

  useEffect(() => {
    if (listProChoose.length > 0) setDisableSelectSup(true);
    else setDisableSelectSup(false);
  }, [listProChoose.length]);

  useEffect(() => {
    if (listSupplier && listSupplier.length > 0) {
      dispatch(getProductsByIdOfSupplier({ id: listSupplier[0].Ma }));
      setIdSup(listSupplier[0].Ma);
    }
  }, [dispatch, listSupplier]);

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

  const onChangeSupplier = (e) => {
    setIdSup(e.target.value);
    dispatch(getProductsByIdOfSupplier({ id: e.target.value }));
  };

  const onChangeColor = (e) => {
    const c = e.target.value;
    let arrSize: any = [];
    listColorAndSize.forEach((val) => {
      if (val[0] === c) {
        Object.entries(val[1]).forEach((size, ind) => {
          arrSize.push(size[0]);
        });
      }
    });
    setListSize(arrSize);
    setColor(c);
    setSize(arrSize[0]);
  };

  const onChangeSize = (e) => {
    setSize(e.target.value);
  };

  const onChangeQuantity = (e) => {
    quantity.setValue(e.target.value);
  };

  const getColorAndSize = useCallback((pro: any) => {
    let arrColor: any = [];
    let arrColorAndSize: any = [];
    let arrSize: any = [];
    arrColorAndSize = Object.entries(pro.KichThuoc_Mau).map((val) => {
      arrColor.push(val[0]);
      return val;
    });
    Object.entries(arrColorAndSize[0][1]).forEach((val, ind) => {
      arrSize.push(val[0]);
    });
    setListColorAndSize(arrColorAndSize);
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
    let total: number = 0;
    listProChoose.forEach((val) => {
      total += val.product.GiaNhap * val.quantity;
    });
    dispatch(
      createBillImport({
        bill: {
          MaNCC: idSup,
          TongTien: total,
        },
        listProduct: listProChoose,
        navigate: () => {
          alert("thêm hóa đơn thành công");
          props.handleBack();
        },
      })
    );
  };

  return (
    <>
      <div className="wrapper-choose-product">
        <div className="wrapper-input-name">
          <label className="title-select">Nhà cung cấp</label>
          <br />
          <select
            className="select-product"
            id="choose-pro"
            onChange={onChangeSupplier}
            disabled={disableSelectSup}
          >
            {listSupplier &&
              listSupplier.map((sup, ind) => (
                <option key={ind} value={sup.Ma}>
                  {sup.Ten}
                </option>
              ))}
          </select>
        </div>
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
                <th>Giá Nhập</th>
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
                  <td>{val.product.GiaNhap}</td>
                  <td>
                    <input
                      value={val.quantity}
                      type="number"
                      onChange={(e) => handleUpdateQuantity(e, ind)}
                      min={1}
                    />
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

export default ChooseProductBillImport;
