import React, { memo } from "react";
import { Modal, Button } from "rsuite";

import "./style.css";
import { useNavigate } from "react-router-dom";
import { InputField } from "@gapo_ui/components";
import { useInput } from "../../../hooks/useInput";
import { validateFullName } from "../../../helpers/validator";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../stores/slices/categorySlice";

interface Props {
  openModel: boolean;
  setOpenModel: (val: boolean) => void;
  id: string;
  title?: string;
  url?: string;
  name?: string;
}
const UpdateCategory = ({
  openModel,
  setOpenModel,
  id,
  title = "",
  url = "",
  name = "",
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameState = useInput(name, validateFullName);
  
  const handleUpdate = () => {
    if (nameState.err() === false) {
      dispatch(updateCategory({ id, name: nameState.value }));
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

export default memo(UpdateCategory);
