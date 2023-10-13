import React, { useState, useEffect } from "react";
import { IconIc24FillArrowheadLeft } from "@gapo_ui/icon";
import { IconIc24FillArrowheadDown } from "@gapo_ui/icon";
import { IconIc24FillArrowheadRight } from "@gapo_ui/icon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { getAllDetailCategory } from "../../stores/slices/detailCategorySlice";
import { getAllProductByIdOfDetailCate, searchProduct } from "../../stores/slices/productSlice";
import { useNavigate } from "react-router-dom";
interface Props {
  category: any;
  active: string;
  keyIndexCate: any;
  searchInput: string;
  setKeyCate: (val: any) => void;
  setDetailCateSelected: (val: any) => void;
}

const CateItem = ({
  category,
  active = "",
  setKeyCate,
  keyIndexCate,
  setDetailCateSelected,
  searchInput,
}: Props) => {
  const [arrowLeft, setArrowLeft] = useState(true);
  const [keyActive, setKeyActive] = useState(-1);
  const listDetailCate = useSelector(
    (state: RootState) => state.detailCategory.listDetailCategory
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllDetailCategory());
  }, [dispatch]);

  const handleClickCateItem = () => {
    setArrowLeft((prev) => !prev);
  };
  const handleClickDetailCate = (ind, cate) => {
    setKeyActive(ind);
    setKeyCate(keyIndexCate);
    setDetailCateSelected(cate.Ma);
    if (!searchInput) dispatch(getAllProductByIdOfDetailCate(cate.Ma));
    else
      dispatch(
        searchProduct({ name: searchInput, idCate: cate.Ma })
      );
    navigate(`/shop/search/${cate.Ten}`);
  };
  return (
    <>
      <li>
        <div className="cate-item" onClick={handleClickCateItem}>
          <h6>{category.Ten}</h6>
          <div>
            {arrowLeft ? (
              <IconIc24FillArrowheadLeft />
            ) : (
              <IconIc24FillArrowheadDown />
            )}
          </div>
        </div>
        {!arrowLeft && (
          <ul>
            {listDetailCate &&
              listDetailCate.map((detailCate, ind) => {
                if (detailCate.MaLoai === category.Ma)
                  return (
                    <li
                      key={ind}
                      onClick={() => handleClickDetailCate(ind, detailCate)}
                      className={
                        keyActive === ind
                          ? `detail-cate-item ${active}`
                          : "detail-cate-item"
                      }
                    >
                      <span>
                        <IconIc24FillArrowheadRight />
                      </span>
                      {detailCate.Ten}
                    </li>
                  );
                return "";
              })}
          </ul>
        )}
      </li>
    </>
  );
};

export default CateItem;
