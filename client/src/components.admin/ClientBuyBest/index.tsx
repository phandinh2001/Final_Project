import React, { useEffect } from "react";
import WrapperTableHome from "../../layouts/admin/wrapperTableHome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import {
  getAllClients,
  getListClientAndTotalMoney,
} from "../../stores/slices/clientSlice";
import { formatDate } from "../../helpers/convert";
import { getAllAccounts } from "../../stores/slices/accountSlice";
import { Avatar } from "@gapo_ui/components";
import { convertNameToAvatar } from "../../helpers/avatarStr";
interface Props {
  dateStart: any;
  dateEnd: any;
  handleNext?: () => void;
  handlePrev?: () => void;
}

const ClientBuyBest = ({ dateStart, dateEnd ,  handleNext = () => {},
handlePrev = () => {},}: Props) => {
  const { listHashSet, listClient } = useSelector(
    (state: RootState) => state.clients
  );
  const { listAccount } = useSelector((state: RootState) => state.accounts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccounts());
    dispatch(getAllClients());
    dispatch(getListClientAndTotalMoney({ dateStart, dateEnd }));
  }, [dateEnd, dateStart, dispatch]);

  return (
    <WrapperTableHome title="Những khách hàng mua nhiều nhất"       handleNext={handleNext}
    handlePrev={handlePrev}>
      <>
        {listHashSet.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th></th>
                <th>Tên Khách hàng</th>
                <th>Số điện thoại</th>
                <th>Số ngày sinh</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {listHashSet.map((val, ind) => {
                return listClient.map((client) => {
                  if (client.Ma === val.idClient) {
                    let check = false;
                    const arr = listAccount.map((acc) => {
                      if (acc.SDT === client.SDT) {
                        check = true;
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td height={50} width={60}>
                              {acc.Anh ? (
                                <Avatar
                                  src={`${acc.Anh}`}
                                  size={40}
                                  alt="icon-80"
                                />
                              ) : (
                                <Avatar
                                  size={40}
                                  UNSAFE_style={{ background: "#00b3f4" }}
                                >
                                  {convertNameToAvatar(acc.Ten)}
                                </Avatar>
                              )}
                            </td>
                            <td>{client.Ten}</td>
                            <td>{client.SDT}</td>
                            <td>{formatDate(client.NgaySinh)}</td>
                            <td>{val.total} VND</td>
                          </tr>
                        );
                      } else return "";
                    });
                    if (check) return arr;
                    else
                      return (
                        <tr key={ind}>
                          <td>{ind + 1}</td>
                          <td height={50} width={60}>
                            <Avatar
                              size={40}
                              UNSAFE_style={{ background: "#00b3f4" }}
                            >
                              {convertNameToAvatar(client.Ten)}
                            </Avatar>
                          </td>
                          <td>{client.Ten}</td>
                          <td>{client.SDT}</td>
                          <td>{formatDate(client.NgaySinh)}</td>
                          <td>{val.total} VND</td>
                        </tr>
                      );
                  }
                  return "";
                });
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "10px 0" }}>chưa có Khách hàng nào</div>
        )}
      </>
    </WrapperTableHome>
  );
};

export default ClientBuyBest;
