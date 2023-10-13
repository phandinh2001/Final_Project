import { InputField } from "@gapo_ui/components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import CKEditorExam from "../../../components/CKEditor";
import { createDetailPro, updateDetailPro } from "../../../services/detailPro";
import { getDetailProItem } from "../../../stores/slices/detailProSlice";
import { RootState } from "../../../stores";

interface Props {
  openModel: boolean;
  setOpenModel: (val: boolean) => void;
  setCloseUpdatePro: (val: boolean) => void;
  idProduct: number;
}
const UpdateDetailPro = ({
  openModel,
  setOpenModel,
  setCloseUpdatePro,
  idProduct,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detailProItem } = useSelector((state: RootState) => state.detailPro);
  const [err, setErr] = useState("");
  const [ckEditor, setCkEditor] = useState(null);

  useEffect(() => {
    dispatch(getDetailProItem(idProduct));
  }, [dispatch, idProduct]);

  useEffect(() => {
    if (detailProItem) setCkEditor(detailProItem.ChiTiet);
  }, [detailProItem]);

  const handleCloseModel = () => {
    navigateToProduct();
  };

  const handleCreate = async () => {
    if (ckEditor) {
      if (detailProItem) await updateDetailPro(detailProItem._id, ckEditor);
      else await createDetailPro({ MaSP: idProduct, ChiTiet: ckEditor });
      navigateToProduct();
      setErr("");
    } else {
      setErr("không được để trống");
    }
  };
  const navigateToProduct = () => {
    alert("cập nhât sản phẩm thành công");
    navigate("/admin/quan_ly/san_pham");
    setCloseUpdatePro(false);
    setOpenModel(false);
  };
  return (
    <>
      <Modal open={openModel} size="sm">
        <Modal.Header>
          <Modal.Title>cập nhật chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrapper-create">
            <InputField
              label="Mã sản phẩm"
              value={idProduct.toString()}
              disabled
            />
            <div className="wrapper-editor">
              {detailProItem ? (
                <CKEditorExam
                  setCkEditor={setCkEditor}
                  title="Chi tiết sản phẩm"
                  context={detailProItem.ChiTiet}
                />
              ) : (
                <CKEditorExam
                  setCkEditor={setCkEditor}
                  title="Chi tiết sản phẩm"
                />
              )}
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
            Cập nhật
          </Button>
          <Button appearance="subtle" onClick={handleCloseModel}>
            hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateDetailPro;
