import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SearchField, View } from "@gapo_ui/components";
import { RootState } from "../../stores";
import { getAllCategories } from "../../stores/slices/categorySlice";

import "./style.css";
import CateItem from "./CateItem";
import { getAllProduct, searchProduct } from "../../stores/slices/productSlice";
const Category = () => {
  const [keyClick, setKeyClick] = useState(-1);
  const [search, setSearch] = useState("");
  const [detailCateSelected, setDetailCateSelected] = useState(null);

  const { listCategory } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const handleGetAllProduct = () => {
    setDetailCateSelected(null);
    setKeyClick(-1);
    setSearch("");
    dispatch(getAllProduct());
    navigate("/shop");
  };
  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(`/shop/search/${value}`);
    dispatch(searchProduct({ name: value, idCate: detailCateSelected }));
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-box-2">
          <h2 className="heading mb-4">
            <Link to={"/shop"} onClick={handleGetAllProduct}>
              Tìm kiếm
            </Link>
          </h2>
          <div className="wrapper-search">
            <View marginEnd={16}>
              <SearchField
                border="rounded"
                placeholder="Tìm kiếm..."
                onChange={onChangeSearch}
                value={search}
              />
            </View>
          </div>
          <ul>
            <li>
              <div className="cate-item" onClick={handleGetAllProduct}>
                <h6>Tất cả sản phẩm</h6>
              </div>
            </li>
            {listCategory &&
              listCategory.map((category, index) => {
                return (
                  <CateItem
                    category={category}
                    key={index}
                    active={keyClick === index ? "active" : ""}
                    setKeyCate={setKeyClick}
                    keyIndexCate={index}
                    setDetailCateSelected={setDetailCateSelected}
                    searchInput={search}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
