import express from "express";
import { createDetailBillImport, getAllDetailBillImport, getDetailBillImportByIdBill } from "../DAL/models/detailBillImportModel";


const detailBillImportRouter = express.Router();

detailBillImportRouter.get("/", (req, res) => {
  getAllDetailBillImport().then((data) => {
    res.json({ count: data.length, detailBill: data });
  });
});

detailBillImportRouter.get("/getDetailBillImportByIdBill/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    getDetailBillImportByIdBill(id).then((data) => {
      res.json({ count: data.length, detailBill: data });
    });
  } else res.status(404).send("không tìm thấy mã hóa đơn");
});

detailBillImportRouter.post("/", (req, res) => {
  const detailBill = req.body;
  createDetailBillImport(detailBill).then((data) => {
    res.json(data);
  });
});

export default detailBillImportRouter;
