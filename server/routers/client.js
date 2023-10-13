import express from "express";
import {
  createClient,
  deleteClientById,
  getAllClients,
  getAllClientsSortById,
  getClientById,
  getClientByPhone,
  updateClient,
} from "../DAL/models/clientModel";
import { getBillOfSaleNotCancel } from "../DAL/models/billOfSaleModel";
import { compareDate } from "../common/compareDate";

const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
  getAllClients().then((data) => {
    res.json({ count: data.length, clients: data });
  });
});
clientRouter.get("/getClientByPhone", (req, res) => {
  const { phone } = req.query;
  if (phone)
    getClientByPhone(phone).then((data) => {
      if (data.length > 0) res.json(data);
      else res.status(404).send("Số điện thoại chưa tồn tại");
    });
  else res.status(403).send("không có số điện thoại");
});

clientRouter.post("/getListClientAndTotalMoney", (req, res) => {
  const { dateStart, dateEnd } = req.body;
  getBillOfSaleNotCancel().then((data) => {
    const arrBill = []
    if (data.length > 0)
      data.forEach((bill) => {
        if (compareDate(bill.Ngay, dateStart) !== -1 && compareDate(bill.Ngay, dateEnd) !== 1) {
          arrBill.push(bill)
        }
      })
    if (arrBill.length < 1) res.json([]);
    else {
      const arrClient = [];
      arrBill.forEach(bill => {
        if (arrClient.length < 1)
          arrClient.push({ idClient: bill.MaKH, total: bill.TongTien })
        else {
          let index
          const hasIdClient = arrClient.some((val, ind) => { if (val.idClient === bill.MaKH) index = ind; return val.idClient === bill.MaKH })
          if (hasIdClient) arrClient[index].total += bill.TongTien
          else arrClient.push({ idClient: bill.MaKH, total: bill.TongTien })
        }
      })
      res.json(arrClient)
    }
  });
});

clientRouter.get("/getClientById/:id", (req, res) => {
  const { id } = req.params;
  getClientById(id).then((data) => {
    res.json(data);
  });
});

clientRouter.post("/", (req, res) => {
  const client = req.body;
  client.NgaySinh = new Date(client.NgaySinh);
  client.DiaChi = client.DiaChi ? client.DiaChi : "";
  client.GioiTinh = client.GioiTinh ? client.GioiTinh : "";
  client.Email = client.Email ? client.Email : "";

  getClientByPhone(client.SDT).then((data) => {
    if (data.length < 1) {
      getAllClientsSortById().then((data) => {
        if (data.length > 0) client.Ma = data[0].Ma + 1;
        else client.Ma = 1;
        if (client.Ma)
          createClient(client).then((data) => {
            res.json(data);
          });
      });
    } else {
      console.log(data);
      res.status(404).send("Số điện thoại đã tồn tại");
    }
  });
});

clientRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const client = req.body;
  updateClient(id, client).then((data) => {
    if (data) res.json(data);
    else res.status(404).send("không tìm thấy khách hàng");
  });
});

clientRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id)
    deleteClientById(id).then((data) => {
      res.json(data);
    });
  else res.status(404).send("không có id");
});


export default clientRouter;
