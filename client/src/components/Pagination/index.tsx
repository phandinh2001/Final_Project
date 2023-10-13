import React from "react";
import SweetPagination from "sweetpagination";

interface Props {
  setCurrentPageData: any;
  data: any;
  dataPerPage: number;
  getStyle?:string
}

function Pagination({ dataPerPage, setCurrentPageData, data,getStyle='style-1' }: Props) {
  return (
    <SweetPagination
      currentPageData={setCurrentPageData}
      dataPerPage={dataPerPage}
      getData={data}
      navigation={true}
      getStyle={getStyle}
    />
  );
}

export default Pagination;
