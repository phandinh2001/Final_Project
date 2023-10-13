import React, { memo } from "react";
import { Modal, Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { InputField } from "@gapo_ui/components";
import { useDispatch } from "react-redux";

import "./style.css";
import { useInput } from "../../../hooks/useInput";
import { validateFullName } from "../../../helpers/validator";
import { createCategory } from "../../../stores/slices/categorySlice";

interface Props {
  openModel: boolean;
  setOpenModel: (val: boolean) => void;
  title?: string;
  url?: string;
}
const CreateCategory = ({
  openModel,
  setOpenModel,
  title = "",
  url = "",
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameState = useInput("", validateFullName);

  const handleCreate = () => {
    if (nameState.err() === false) {
      dispatch(createCategory(nameState.value));
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

export default memo(CreateCategory);
