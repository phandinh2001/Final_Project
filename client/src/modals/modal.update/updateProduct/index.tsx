import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputField } from "@gapo_ui/components";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";
import DefaultModel from "../../../layouts/admin/defaultModel";
import CKEditorExam from "../../../components/CKEditor";
import { useInput } from "../../../hooks/useInput";
import { getAllBrands } from "../../../stores/slices/brandSlice";
import { getAllDetailCategory } from "../../../stores/slices/detailCategorySlice";
import { getAllSuppliers } from "../../../stores/slices/supplierSlice";
import {
  isEmpty,
  validateNumber,
  validatePromotion,
} from "../../../helpers/validator";
import { RootState } from "../../../stores";
import {
  clearStateColorAndSize,
  createColorAndSizeByObject,
} from "../../../stores/slices/colorAndSizeSlice";
import ImageProduct from "../../ListArrImg/image";
import ColorAndSize from "../../ColorAndSize/colorAndSize";
import { updateProduct } from "../../../stores/slices/productSlice";
import UpdateDetailPro from "../updateDetailPro";

interface Props {
  setIsUpdate: (val: boolean) => void;
  product: any;
}
const UpdateProduct = ({ setIsUpdate, product }: Props) => {
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
  const [openUpdateDetail, setOpenUpdateDetail] = useState(false);

  const [ckEditor, setCkEditor] = useState(product.MoTa);
  const [count, setCount] = useState(product.SoLuong);
  const [arrImg, setArrImg] = useState(product.Anh);

  const name = useInput(product.Ten, isEmpty);
  const priceEX = useInput(product.GiaBan, validateNumber);
  const priceIM = useInput(product.GiaNhap, validateNumber);
  const promotion = useInput(product.KhuyenMai, validatePromotion);
  const bra = useRef(product.MaThuongHieu);
  const cate = useRef(product.MaLoai);
  const sup = useRef(product.MaNCC);
  const sex = useRef(product.GioiTinh);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllDetailCategory());
    dispatch(getAllSuppliers());
    dispatch(createColorAndSizeByObject(product.KichThuoc_Mau));
    return () => {
      dispatch(clearStateColorAndSize());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handleCancel = () => {
    navigate("/admin/quan_ly/san_pham");
    setIsUpdate(false);
  };

  const handleUpdateProduct = () => {
    setOpenUpdateDetail(true);
    dispatch(
      updateProduct({
        product: {
          id: product._id,
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

  const handleOpenColor = () => {
    setOpenColor(true);
  };
  const handleOpenImage = () => {
    setOpenImage(true);
  };
  return (
    <>
      <DefaultModel onClickCancel={handleCancel}>
        <>
          <div>
            <div className="wrapper-title-model">
              <h3>Cập nhật sản phẩm</h3>
            </div>
            <div className="wrapper-input input-name-product">
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
            <div className="wrapper-create-Product">
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
                <select
                  className="select-product"
                  onChange={onChangeCate}
                  defaultValue={cate.current}
                >
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
                <select
                  className="select-product"
                  onChange={onChangeBrand}
                  defaultValue={bra.current}
                >
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
                <select
                  className="select-product"
                  onChange={onChangeSupplier}
                  defaultValue={sup.current}
                >
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
                <select
                  className="select-product"
                  onChange={onChangeSex}
                  defaultValue={sex.current}
                >
                  <option value={"nam"}>Nam</option>
                  <option value={"nu"}>Nữ</option>
                  <option value={"nam_nu"}>Nam và nữ</option>
                </select>
              </div>
              <div className="wrapper-input">
                <div className="btn-create-product">
                  <Button color="accentPrimary" onPress={handleOpenColor}>
                    Cập nhật màu và kích thước
                  </Button>
                  {openColor && (
                    <ColorAndSize
                      openModel={openColor}
                      setOpenModel={setOpenColor}
                      setCount={setCount}
                    />
                  )}
                </div>
              </div>
              <div className="wrapper-input">
                <div className="btn-create-product">
                  <Button color="accentPrimary" onPress={handleOpenImage}>
                    Cập nhật ảnh
                  </Button>
                  {openImage && (
                    <>
                      <ImageProduct
                        openModel={openImage}
                        setOpenModel={setOpenImage}
                        setArrImg={setArrImg}
                        arrImg={arrImg}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="wrapper-editor">
                <CKEditorExam
                  setCkEditor={setCkEditor}
                  title="Mô tả sản phẩm"
                  context={ckEditor}
                />
              </div>
            </div>
          </div>
          <div className="btn-create-product">
            <Button color="accentPrimary" onPress={handleUpdateProduct}>
              Cập nhật
            </Button>
          </div>
          {openUpdateDetail && (
            <>
              <UpdateDetailPro
                openModel={openUpdateDetail}
                setOpenModel={setOpenUpdateDetail}
                setCloseUpdatePro={setIsUpdate}
                idProduct={product.Ma}
              />
            </>
          )}
        </>
      </DefaultModel>
    </>
  );
};

export default UpdateProduct;
