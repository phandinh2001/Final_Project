import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Link } from 'react-router-dom';

import {
  IconIc24FillArchiveBoxXmark,
  IconIc24FillPencil,
} from '@gapo_ui/icon';

import DeleteModel from '../../modals/deleteModel';
import UpdateSupplier from '../../modals/modal.update/updateSuplier';
import { RootState } from '../../stores';
import {
  deleteSupplier,
  getAllSuppliers,
} from '../../stores/slices/supplierSlice';

const SupplierTBody = () => {
  const dispatch = useDispatch();
  const { listSupplier } = useSelector((state: RootState) => state.suppliers);

  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [openModelUpdate, setOpenModelUpdate] = useState(false);
  const idSup = useRef("");
  const supItem = useRef("");

  useEffect(() => {
    dispatch(getAllSuppliers());
  }, [dispatch]);

  const handleDeleteSupplier = (id) => {
    console.log(id);

    dispatch(deleteSupplier(id));
  };
  const handleOpenModelDelete = (id) => {
    idSup.current = id;
    setOpenModelDelete(true);
  };
  const handleOpenModelUpdate =(sup) =>{
    supItem.current = sup
    setOpenModelUpdate(true)
  }
  return (
    <>
      {listSupplier &&
        listSupplier.map((sup, ind) => (
          <tr key={ind}>
            <td>{sup.Ma}</td>
            <td>{sup.Ten}</td>
            <td>{sup.SDT}</td>
            <td>{sup.DiaChi}</td>
            <td>
              <div className="wrapper-icon">
                <Link
                  to={`/admin/quan_ly/nha_cung_cap/${sup._id}`}
                  className="icon bg-color-eye"
                    onClick={() => handleOpenModelUpdate(sup)}
                >
                  <IconIc24FillPencil color="lineTertiary" size={14} />
                </Link>
                <Link
                  to={`/admin/quan_ly/nha_cung_cap/${sup._id}`}
                  className="icon bg-color-delete"
                  onClick={() => handleOpenModelDelete(sup._id)}
                >
                  <IconIc24FillArchiveBoxXmark color="lineTertiary" size={14} />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      <tr>
        <td>
          {openModelDelete === true && (
            <DeleteModel
              openModel={openModelDelete}
              setOpenModel={setOpenModelDelete}
              onClickDelete={() => handleDeleteSupplier(idSup.current)}
              title="Xóa loại sản phẩm"
              Placeholder={`Bạn có chắc chắn muốn xóa Nhà cung cấp có mã = ${idSup.current} không?`}
              url="/admin/quan_ly/nha_cung_cap"
            />
          )}
          {openModelUpdate && <UpdateSupplier setIsCreate = {setOpenModelUpdate} supplier = {supItem.current} />}
        </td>
      </tr>
    </>
  );
};

export default SupplierTBody;
