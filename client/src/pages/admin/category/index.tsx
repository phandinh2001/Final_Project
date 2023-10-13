import React from "react";
import CategoryTable from "./categoryTable";
import DetailTable from "./detailTable";

const Category = () => {
  return (
    <>
      <div>
        <div>
          <CategoryTable />
        </div>
        <div>
          <DetailTable />
        </div>
      </div>
    </>
  );
};

export default Category;
