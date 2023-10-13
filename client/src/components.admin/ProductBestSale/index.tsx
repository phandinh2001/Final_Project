import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconIc24FillEye } from "@gapo_ui/icon";

import { getAllProduct } from "../../stores/slices/productSlice";
import { RootState } from "../../stores";
import Slider from "../../components/Slider";
import DetailProduct from "../../modals/DetailProduct";

import "./style.css";
import { getDetailBillOfSaleByHashSetOfDate } from "../../stores/slices/detailBillOfSaleSlice";
import Pagination from "../../components/Pagination";
import WrapperTableHome from "../../layouts/admin/wrapperTableHome";
interface Props {
  dateStart: any;
  dateEnd: any;
  handleNext?: () => void;
  handlePrev?: () => void;
}

const PAGE_COUNT = 3;

const ProductBestSale = ({
  dateStart,
  dateEnd,
  handleNext = () => {},
  handlePrev = () => {},
}: Props) => {
  const dispatch = useDispatch();
  const [openModelDetail, setOpenModelDetail] = useState(false);
  const [dataProBestSale, setDataProBestSale] = useState([]);
  const productItem = useRef(null);

  const { listProduct } = useSelector((state: RootState) => state.products);
  const { listHashSet } = useSelector(
    (state: RootState) => state.detailBillOfSale
  );
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getDetailBillOfSaleByHashSetOfDate({ dateStart, dateEnd }));
  }, [dateEnd, dateStart, dispatch]);

  useEffect(() => {
    if (listHashSet.length <= PAGE_COUNT) setDataProBestSale(listHashSet);
  }, [listHashSet]);

  const handleShowDetailProduct = (pro) => {
    setOpenModelDetail(true);
    productItem.current = pro;
  };
  return (
    <WrapperTableHome
      title="Những sản phẩm bán nhiều nhất"
      handleNext={handleNext}
      handlePrev={handlePrev}
    >
      {dataProBestSale.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th></th>
              <th style={{ width: "300px" }}>Tên sản phẩm</th>
              <th>Đã bán</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataProBestSale.map((val: any, ind) => {
              return listProduct.map((pro) => {
                if (val.idPro === pro.Ma)
                  return (
                    <tr key={ind}>
                      <td>{ind + 1}</td>
                      <td>
                        <Slider slideImg={pro.Anh} url="/assets/img_product/" />
                      </td>
                      <td>
                        <div className="name-product-limit-1">{pro.Ten} </div>
                      </td>
                      <td>{val.count}</td>
                      <td>
                        <div className="wrapper-icon">
                          <div
                            className="icon bg-color-eye"
                            onClick={() => {
                              handleShowDetailProduct(pro);
                            }}
                          >
                            <IconIc24FillEye color="lineTertiary" size={14} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                return "";
              });
            })}
          </tbody>
        </table>
      ) : (
        <div style={{ padding: "10px 0" }}>chưa có sản phẩm nào</div>
      )}
      {openModelDetail && (
        <DetailProduct
          setOpenModel={setOpenModelDetail}
          url="/admin"
          product={productItem.current}
        />
      )}
      {listHashSet.length > PAGE_COUNT && (
        <div className="wrapper-pagination">
          <Pagination
            dataPerPage={PAGE_COUNT}
            data={listHashSet}
            setCurrentPageData={setDataProBestSale}
            getStyle="style-2"
          />
        </div>
      )}
    </WrapperTableHome>
  );
};

export default ProductBestSale;
