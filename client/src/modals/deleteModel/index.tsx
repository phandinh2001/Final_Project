import React from "react";
import { Modal, Button } from "rsuite";

import "./style.css";
import { useNavigate } from "react-router-dom";

interface Props {
  openModel: boolean;
  setOpenModel: (val: boolean) => void;
  Placeholder?: string;
  title?: string;
  onClickDelete?: () => void;
  url?: string;
}
const DeleteModel = ({
  openModel,
  setOpenModel,
  Placeholder = "",
  title = "",
  onClickDelete = () => {},
  url = "",
}: Props) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    onClickDelete();
    setOpenModel(false);
    if (url) navigate(url);
  };
  const handleCloseModel = () => {
    setOpenModel(false);
    if (url) navigate(url);
  };
  return (
    <>
      <Modal open={openModel} onClose={handleCloseModel}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Placeholder}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} appearance="primary">
            Xóa
          </Button>
          <Button onClick={handleCloseModel} appearance="subtle">
            hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModel;
