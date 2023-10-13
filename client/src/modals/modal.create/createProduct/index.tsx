import React, { useEffect, useState, useRef } from "react";

import "./style.css";
import DefaultModel from "../../../layouts/admin/defaultModel";
import { useNavigate } from "react-router-dom";
import { Button, InputField } from "@gapo_ui/components";
import { useDispatch } from "react-redux";
import { getAllBrands } from "../../../stores/slices/brandSlice";
import { getAllDetailCategory } from "../../../stores/slices/detailCategorySlice";
import { getAllSuppliers } from "../../../stores/slices/supplierSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import CKEditorExam from "../../../components/CKEditor";
import { useInput } from "../../../hooks/useInput";
import {
  checkErrValidateForm,
  isEmpty,
  validateNumber,
  validatePromotion,
} from "../../../helpers/validator";
import { createProduct } from "../../../stores/slices/productSlice";
import { clearStateColorAndSize } from "../../../stores/slices/colorAndSizeSlice";
import CreateDetailPro from "../createDetailPro";
import ImageProduct from "../../ListArrImg/image";
import ColorAndSize from "../../ColorAndSize/colorAndSize";
interface Props {
  setIsCreate: (val: boolean) => void;
}
const CreateProduct = ({ setIsCreate }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detailCategory = useSelector(
    (state: RootState) => state.detailCategory.listDetailCategory
  );
  const brands = useSelector((state: RootState) => state.brands.listBrand);
  const { listSupplier } = useSelector((state: RootState) => state.suppliers);
  const { colorAndSize } = useSelector(
    (state: RootState) => state.colorAndSize
  );

  const [openColor, setOpenColor] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openCreateDetail, setOpenCreateDetail] = useState(false);
  const [arrImg, setArrImg] = useState([]);

  const [ckEditor, setCkEditor] = useState(null);
  const [count, setCount] = useState(0);

  const name = useInput("", isEmpty);
  const priceEX = useInput("", validateNumber);
  const priceIM = useInput("", validateNumber);
  const promotion = useInput("", validatePromotion);
  const bra = useRef(null);
  const cate = useRef(null);
  const sup = useRef(null);
  const sex = useRef("nam");

  const handleBack = () => {
    navigate("/admin/quan_ly/san_pham");
    setIsCreate(false);
  };

  const handleOpenColor = () => {
    setOpenColor(true);
  };
  const handleOpenImage = () => {
    setOpenImage(true);
  };
  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllDetailCategory());
    dispatch(getAllSuppliers());
    return () => {
      dispatch(clearStateColorAndSize());
    };
  }, [dispatch]);

  useEffect(() => {
    if (brands.length > 0) bra.current = brands[0].Ma;
    if (detailCategory.length > 0) cate.current = detailCategory[0].Ma;
    if (listSupplier.length > 0) sup.current = listSupplier[0].Ma;
  }, [brands, detailCategory, listSupplier]);

  const handleCreateProduct = () => {
    if (isErr() === false) {
      setOpenCreateDetail(true);
      dispatch(
        createProduct({
          product: {
            Ten: name.value,
            GiaBan: Number(priceEX.value),
            GiaNhap: Number(priceIM.value),
            MaLoai: Number(cate.current),
            KhuyenMai: Number(promotion.value),
            MaThuongHieu: Number(bra.current),
            MaNCC: Number(sup.current),
            GioiTinh: sex.current,
            MoTa: ckEditor,
            KichThuoc_Mau: colorAndSize,
            Anh: arrImg,
            SoLuong: count,
          },
          navigate: (val: number | string) => {
            navigate(`/admin/quan_ly/san_pham/${val}`);
          },
        })
      );
    }
  };

  const onChangeSex = (e) => {
    sex.current = e.target.value;
  };
  const onChangeSupplier = (e) => {
    sup.current = e.target.value;
  };
  const onChangeBrand = (e) => {
    bra.current = e.target.value;
  };
  const onChangeCate = (e) => {
    cate.current = e.target.value;
  };
  const onChangeName = (e) => {
    name.setValue(e.target.value);
  };
  const onChangePriceIM = (e) => {
    priceIM.setValue(e.target.value);
  };
  const onChangePriceEX = (e) => {
    priceEX.setValue(e.target.value);
  };
  const onChangePromotion = (e) => {
    promotion.setValue(e.target.value);
  };

  const isErr = () => {
    const e = checkErrValidateForm(
      name.err(),
      priceEX.err(),
      priceIM.err(),
      promotion.err()
    );
    if (e === true) return true;
    else if (arrImg.length < 1) {
      alert("bạn chưa chọn ảnh");
      return true;
    } else if (Object.keys(colorAndSize).length < 1) {
      alert("bạn chưa chọn màu và size");
      return true;
    }
    return false;
  };
  return (
    <>
      <DefaultModel onClickCancel={handleBack}>
        <>
          <div>
            <div className="wrapper-title-model">
              <h3>Thêm mới sản phẩm</h3>
              <Button color="accentPrimary" onPress={handleOpenImage}>
                Thêm ảnh
              </Button>
              {openImage && (
                <ImageProduct
                  openModel={openImage}
                  setOpenModel={setOpenImage}
                  setArrImg={setArrImg}
                  arrImg={arrImg}
                />
              )}
            </div>
            <div className="wrapper-create-Product">
              <div className="wrapper-input">
                <InputField
                  fullWidth
                  label="Tên sản phẩm"
                  placeholder="Tên sản phẩm"
                  value={name.value}
                  helperText={name.helperText}
                  error={name.isErr}
                  onChange={onChangeName}
                />
              </div>
              <div className="wrapper-input">
                <InputField
                  fullWidth
                  label="Giá nhập"
                  placeholder="Giá nhập"
                  value={priceIM.value}
                  helperText={priceIM.helperText}
                  error={priceIM.isErr}
                  onChange={onChangePriceIM}
                />
              </div>
              <div className="wrapper-input">
                <InputField
                  fullWidth
                  label="Giá bán"
                  placeholder="Giá bán"
                  value={priceEX.value}
                  helperText={priceEX.helperText}
                  error={priceEX.isErr}
                  onChange={onChangePriceEX}
                />
              </div>
              <div className="wrapper-input">
                <label className="title-select">Loại sản phẩm:</label>
                <br />
                <select className="select-product" onChange={onChangeCate}>
                  {detailCategory &&
                    detailCategory.map((cate, ind) => (
                      <option key={ind} value={cate.Ma}>
                        {cate.Ten}
                      </option>
                    ))}
                </select>
              </div>
              <div className="wrapper-input">
                <InputField
                  fullWidth
                  label="Khuyến mại"
                  placeholder="Khuyến mại"
                  rightItem="%"
                  value={promotion.value}
                  helperText={promotion.helperText}
                  error={promotion.isErr}
                  onChange={onChangePromotion}
                />
              </div>
              <div className="wrapper-input">
                <label className="title-select">Thương hiệu:</label>
                <br />
                <select className="select-product" onChange={onChangeBrand}>
                  {brands &&
                    brands.map((bra, ind) => {
                      return (
                        <option key={ind} value={bra.Ma}>
                          {bra.Ten}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="wrapper-input">
                <label className="title-select">Nhà cung cấp:</label>
                <br />
                <select className="select-product" onChange={onChangeSupplier}>
                  {listSupplier &&
                    listSupplier.map((sup, ind) => (
                      <option key={ind} value={sup.Ma}>
                        {sup.Ten}
                      </option>
                    ))}
                </select>
              </div>
              <div className="wrapper-input">
                <label className="title-select">Giới tính:</label>
                <br />
                <select className="select-product" onChange={onChangeSex}>
                  <option value={"nam"}>Nam</option>
                  <option value={"nu"}>Nữ</option>
                  <option value={"nam_nu"}>Nam và nữ</option>
                </select>
              </div>
              <div className="wrapper-input">
                <div className="btn-create-product">
                  <Button color="accentPrimary" onPress={handleOpenColor}>
                    Thêm màu và kích thước
                  </Button>
                </div>
              </div>
              <div className="wrapper-editor">
                <CKEditorExam setCkEditor={setCkEditor} title="Mô tả sản phẩm"/>
              </div>
            </div>
          </div>
          <div className="btn-create-product">
            <Button color="accentPrimary" onPress={handleCreateProduct}>
              Thêm Mới
            </Button>
          </div>
          {openColor && (
            <ColorAndSize
              openModel={openColor}
              setOpenModel={setOpenColor}
              setCount={setCount}
            />
          )}
        </>
      </DefaultModel>
      {openCreateDetail && (
        <CreateDetailPro
          openModel={openCreateDetail}
          setOpenModel={setOpenCreateDetail}
          setCloseCreatePro = {setIsCreate}
        />
      )}
    </>
  );
};

export default CreateProduct;
