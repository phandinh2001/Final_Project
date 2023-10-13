import React, { memo, useState } from "react";
import { Modal, Button } from "rsuite";

import "./style.css";
import { useNavigate } from "react-router-dom";
import { InputField } from "@gapo_ui/components";
import { useInput } from "../../../hooks/useInput";
import { validateFullName } from "../../../helpers/validator";
import { useDispatch } from "react-redux";
import { RootState } from "../../../stores";
import { useSelector } from "react-redux";
import { updateDetailCategory } from "../../../stores/slices/detailCategorySlice";

interface Props {
  openModel: boolean;
  setOpenModel: (val: boolean) => void;
  title?: string;
  url?: string;
  detailCate?: any;
}
const UpdateDetailCate = ({
  openModel,
  setOpenModel,
  title = "",
  url = "",
  detailCate = null,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameState = useInput(detailCate.Ten, validateFullName);
  const [idCate, setIdCate] = useState<number>(detailCate.MaLoai);
  
  const { listCategory } = useSelector((state: RootState) => state.categories);
  const handleUpdate = () => {
    if (nameState.err() === false) {
      dispatch(
        updateDetailCategory({
          id: detailCate._id,
          name: nameState.value,
          idCate,
        })
      );
      setOpenModel(false);
      if (url) navigate(url);
    }
  };
  const handleCloseModel = () => {
    setOpenModel(false);
    if (url) navigate(url);
    nameState.reset();
  };
  const onChangeName = (e: any) => {
    nameState.setValue(e.target.value);
  };
  const onChangeIdCate = (e) => {
    setIdCate(e.target.value);
  };
  return (
    <>
      <Modal open={openModel} onClose={handleCloseModel} size="xs">
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputField
            label="Tên Loại :"
            value={nameState.value}
            helperText={nameState.helperText}
            error={true}
            onChange={onChangeName}
          />
          <div className="wrapper-select">
            <label className="title-select">Loại sản phẩm :</label>
            <br />
            <select className="select" onChange={onChangeIdCate} value={idCate}>
              {listCategory &&
                listCategory.map((val, ind) => (
                  <option key={ind} value={val.Ma}>
                    {val.Ten}
                  </option>
                ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdate} appearance="primary">
            cập nhật
          </Button>
          <Button onClick={handleCloseModel} appearance="subtle">
            hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(UpdateDetailCate);
