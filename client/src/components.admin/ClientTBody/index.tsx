import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconIc24FillPencil } from "@gapo_ui/icon";
import { IconIc24FillArchiveBoxXmark } from "@gapo_ui/icon";
import { Link } from "react-router-dom";

import { deleteClient, getAllClients } from "../../stores/slices/clientSlice";
import { RootState } from "../../stores";
import { convertSex } from "../../helpers/convert";
import { getAllAccounts } from "../../stores/slices/accountSlice";
import { findPhoneInArr } from "../../helpers/find";
import UpdateClient from "../../modals/modal.update/updateClient";
import DeleteModel from "../../modals/deleteModel";

const ClientTBody = () => {
  const dispatch = useDispatch();
  const { listClient } = useSelector((state: RootState) => state.clients);
  const { listAccount } = useSelector((state: RootState) => state.accounts);
  const [isUpdate, setIsUpdate] = useState(false);
  const clientItem = useRef(null);
  const idClient = useRef("");
  const [openModelDelete, setOpenModelDelete] = useState(false);
  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllAccounts());
  }, [dispatch]);

  const handleOpenModelUpdate = (client) => {
    clientItem.current = client;
    setIsUpdate(true);
  };
  const handleOpenModelDelete = (client) => {
    setOpenModelDelete(true);
    idClient.current = client._id;
  };
  const handleDeleteClient = () => {
    dispatch(deleteClient(idClient.current));
  };
  return (
    <>
      {listClient &&
        listClient.map((client, ind) => (
          <tr key={ind}>
            <td>{client.Ma}</td>
            <td>{client.Ten}</td>
            <td>{client.SDT}</td>
            <td>{new Date(client.NgaySinh).toLocaleDateString()}</td>
            <td>{convertSex(client.GioiTinh)}</td>
            <td>{client.Email}</td>
            <td>{client.DiaChi}</td>
            <td>
              {findPhoneInArr(listAccount, client.SDT) === false ? (
                <div className="wrapper-icon">
                  <Link
                    to={`/admin/quan_ly/khach_hang/${client._id}`}
                    className="icon bg-color-eye"
                    onClick={() => handleOpenModelUpdate(client)}
                  >
                    <IconIc24FillPencil color="lineTertiary" size={14} />
                  </Link>
                  <Link
                    to={`/admin/quan_ly/khach_hang/${client._id}`}
                    className="icon bg-color-delete"
                    onClick={() => handleOpenModelDelete(client)}
                  >
                    <IconIc24FillArchiveBoxXmark
                      color="lineTertiary"
                      size={14}
                    />
                  </Link>
                </div>
              ) : (
                <div style={{ height: "40px" }}></div>
              )}
            </td>
          </tr>
        ))}
      <tr>
        <td>
          {isUpdate && (
            <UpdateClient
              setIsUpdate={setIsUpdate}
              client={clientItem.current}
            />
          )}
        </td>
        <td>
          {openModelDelete && (
            <DeleteModel
              openModel={openModelDelete}
              setOpenModel={setOpenModelDelete}
              onClickDelete={handleDeleteClient}
              title="Xóa khach hàng"
              Placeholder={`Bạn có chắc chắn muốn xóa khách hàng có mã ${idClient.current} không?`}
              url="/admin/quan_ly/khach_hang"
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default ClientTBody;
