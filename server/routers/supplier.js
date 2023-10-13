import express from 'express';

import { getProductByIdOfSupplier } from '../DAL/models/productModel';
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getAllSupplierSortById,
  getSupplierById,
  getSupplierByIdOfMongo,
  updateSupplier,
} from '../DAL/models/supplierModel';

const supplierRouter = express.Router();

supplierRouter.get("/", (req, res) => {
  getAllSuppliers().then((data) => {
    res.json({ count: data.length, suppliers: data });
  });
});
supplierRouter.get("/supplierById", (req, res) => {
  const id = req.query.id;
  getSupplierById(id)
    .then((data) => {
      if (data) res.json(data);
      else res.status(404).send("id not found");
    })
    .catch((e) => {
      res.status(403).send(e);
    });
});

supplierRouter.post("/", (req, res) => {
  const newSupplier = req.body;
  getAllSupplierSortById().then((data) => {
    if (data.length > 0) newSupplier.Ma = data[0].Ma + 1;
    else newSupplier.Ma = 1;
    if (newSupplier.Ma)
      createSupplier(newSupplier).then((data) => {
        res.json(data);
      });
  });
});

supplierRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    getSupplierByIdOfMongo(id).then((data) => {
      if (data)
        getProductByIdOfSupplier(data.Ma).then((data) => {
          if (data.length > 0) {
            res.json({ delete: false });
          } else
            deleteSupplier(id).then((data) => {
              res.json({ delete: true, supplier: data });
            });
        });
      else res.status(404).send("không tìm thấy Nhà cung cấp");
    });
  } else res.status(404).send("không có tìm thấy mã");
});

supplierRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const supplier = req.body;
  updateSupplier(id, supplier).then((data) => {
    if (data) res.json(data);
    else res.status(404).send("không tìm thấy nhà cung cấp");
  });
});

export default supplierRouter;
