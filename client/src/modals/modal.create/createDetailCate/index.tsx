import React, { memo, useState } from "react";
import { Modal, Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { InputField } from "@gapo_ui/components";
import { useDispatch } from "react-redux";

import "./style.css";
import { useInput } from "../../../hooks/useInput";
import { validateFullName } from "../../../helpers/validator";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { createDetailCate } from "../../../stores/slices/detailCategorySlice";

interface Props {
  openModel: boolean;
  setOpenModel: (val: boolean) => void;
  title?: string;
  url?: string;
}
const CreateDetailCate = ({
  openModel,
  setOpenModel,
  title = "",
  url = "",
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameState = useInput("", validateFullName);
  const [idCate, setIdCate] = useState<number>(1);
  const categories = useSelector(
    (state: RootState) => state.categories.listCategory
  );
  const handleCreate = () => {
    if (nameState.err() === false) {
      dispatch(createDetailCate({ name: nameState.value, idCate }));
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
            label="Tên chi tiết loại :"
            value={nameState.value}
            helperText={nameState.helperText}
            error={true}
            onChange={onChangeName}
          />
          <div className="wrapper-select">
            <label className="title-select">Loại sản phẩm :</label>
            <br />
            <select className="select" onChange={onChangeIdCate}>
              {categories &&
                categories.map((val, ind) => (
                  <option key={ind} value={val.Ma}>
                    {val.Ten}
                  </option>
                ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreate} appearance="primary">
            Thêm mới
          </Button>
          <Button onClick={handleCloseModel} appearance="subtle">
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(CreateDetailCate);
