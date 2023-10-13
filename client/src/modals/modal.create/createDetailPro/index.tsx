import { InputField } from "@gapo_ui/components";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "rsuite";
import CKEditorExam from "../../../components/CKEditor";
import { createDetailPro } from "../../../services/detailPro";

interface Props {
  openModel: boolean;
  setOpenModel: (val: boolean) => void;
  setCloseCreatePro: (val: boolean) => void;
}
const CreateDetailPro = ({
  openModel,
  setOpenModel,
  setCloseCreatePro,
}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [idPro, setIdPro] = useState("");
  const [err, setErr] = useState("");
  const [ckEditor, setCkEditor] = useState(null);
  useEffect(() => {
    setIdPro(location.pathname.split("/").reverse()[0]);
  }, [location.pathname]);
  const handleCloseModel = () => {
    alert("thêm mới sản phẩm thành công");
    navigate("/admin/quan_ly/san_pham");
    setOpenModel(false);
    setCloseCreatePro(false);
  };

  const handleCreate = async () => {
    if (ckEditor) {
      await createDetailPro({ MaSP: idPro, ChiTiet: ckEditor });
      alert("thêm mới sản phẩm thành công");
      navigate("/admin/quan_ly/san_pham");
      setCloseCreatePro(false);
      setOpenModel(false);
      setErr("");
    } else {
      setErr("không được để trống");
    }
  };
  return (
    <>
      <Modal open={openModel} size="sm">
        <Modal.Header>
          <Modal.Title>cập nhật chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrapper-create">
            <InputField label="Mã sản phẩm" value={idPro} disabled />
            <div className="wrapper-editor">
              <CKEditorExam setCkEditor={setCkEditor} title="Chi tiết sản phẩm"/>
              <div
                style={{ margin: "15px 0", width: "100%", textAlign: "center" }}
              >
                {err}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" onClick={handleCreate}>
            thêm mới
          </Button>
          <Button appearance="subtle" onClick={handleCloseModel}>
            hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateDetailPro;
