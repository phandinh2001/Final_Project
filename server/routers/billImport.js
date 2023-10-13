import express from "express";
import { createBillImport, getAllBillImport, getAllBillImportSortById, updateBillImport } from "../DAL/models/billImportModel";

const billImportRouter = express.Router();

billImportRouter.get("/", (req, res) => {
  getAllBillImport().then((data) => {
    res.json({ count: data.length, bill: data });
  });
});

billImportRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const bill = req.body;
  updateBillImport(id, bill).then((data) => {
    res.json(data);
  }).catch((e) => {
    res.status(404).send("không tìm thấy hóa đơn");
  });
});

billImportRouter.post("/", (req, res) => {
  const bill = req.body;
  bill.Huy = bill.Huy ? bill.Huy : false;
  bill.ThanhToan = bill.ThanhToan ? bill.ThanhToan : false;
  bill.TrangThai = bill.TrangThai ? bill.TrangThai : 0;
  bill.GhiChu = bill.GhiChu ? bill.GhiChu : '';
  bill.Ngay = bill.Ngay ? new Date(bill.Ngay) : new Date();
  getAllBillImportSortById().then((data) => {
    if (data.length > 0) bill.MaHD = data[0].MaHD + 1;
    else bill.MaHD = 1;
    if (bill.MaHD)
      createBillImport(bill).then((data) => {
        res.json(data);
      });
  });
});

export default billImportRouter

