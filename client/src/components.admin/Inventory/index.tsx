import React, { useEffect, useState, useRef } from "react";
import { IconIc24FillEye } from "@gapo_ui/icon";
import WrapperTableHome from "../../layouts/admin/wrapperTableHome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import {
  getInventoryAndSold,
  removeListProductInStore,
} from "../../stores/slices/productSlice";
import {
  getAllDetailBillOfSaleByHashSet,
  removeListHashSetOfDetailBillInStore,
} from "../../stores/slices/detailBillOfSaleSlice";
import Slider from "../../components/Slider";
import DetailProduct from "../../modals/DetailProduct";
import Pagination from "../../components/Pagination";

interface Props {
  handleNext?: () => void;
  handlePrev?: () => void;
}

const PAGE_COUNT = 3;

const Inventory = ({ handleNext = () => {}, handlePrev = () => {} }: Props) => {
  const dispatch = useDispatch();
  const [openModelDetail, setOpenModelDetail] = useState(false);
  const productItem = useRef(null);
  const [dataProInventory, setDataProInventory] = useState([]);

  const { listProduct } = useSelector((state: RootState) => state.products);
  const { listHashSet } = useSelector(
    (state: RootState) => state.detailBillOfSale
  );

  useEffect(() => {
    dispatch(getInventoryAndSold());
    dispatch(getAllDetailBillOfSaleByHashSet());
    return () => {
      dispatch(removeListProductInStore());
      dispatch(removeListHashSetOfDetailBillInStore());
    };
  }, [dispatch]);

  useEffect(() => {
    if (listProduct.length <= PAGE_COUNT) setDataProInventory(listProduct);
  }, [listProduct]);

  const handleShowDetailProduct = (pro) => {
    setOpenModelDetail(true);
    productItem.current = pro;
  };

  return (
    <WrapperTableHome
      title="Danh sách hàng tồn kho"
      handleNext={handleNext}
      handlePrev={handlePrev}
    >
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th></th>
            <th style={{ width: "300px" }}>Tên sản phẩm</th>
            <th>Số lượng tồn</th>
            <th>Đã bán</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataProInventory.length > 0 &&
            dataProInventory.map((pro: any, ind) => {
              let sold = 0;
              // eslint-disable-next-line array-callback-return
              listHashSet.map((val) => {
                if (val.idPro === pro.Ma) sold = val.count;
              });
              return (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  <td>
                    <Slider slideImg={pro.Anh} url="/assets/img_product/" />
                  </td>
                  <td>
                    <div className="name-product-limit-1">{pro.Ten} </div>
                  </td>
                  <td>{pro.SoLuong}</td>
                  <td>{sold}</td>
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
            })}
        </tbody>
      </table>
      {openModelDetail && (
        <DetailProduct
          setOpenModel={setOpenModelDetail}
          url="/admin"
          product={productItem.current}
        />
      )}
      {listProduct.length > PAGE_COUNT && (
        <div className="wrapper-pagination">
          <Pagination
            dataPerPage={PAGE_COUNT}
            data={listProduct}
            setCurrentPageData={setDataProInventory}
            getStyle="style-2"
          />
        </div>
      )}
    </WrapperTableHome>
  );
};

export default Inventory;
