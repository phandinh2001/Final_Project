import express from 'express';

import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getAllBrandSortById,
  getBrandById,
  getBrandByIdOfMongo,
  updateBrand,
} from '../DAL/models/brandModel';
import { getProductByIdOfBrand } from '../DAL/models/productModel';

const brandRouter = express.Router();

brandRouter.get("/", (req, res) => {
  getAllBrand().then((data) => {
    res.json({ count: data.length, brands: data });
  });
});
brandRouter.get("/brandById", (req, res) => {
  const id = req.query.id;
  getBrandById(id)
    .then((data) => {
      if (data) res.json(data);
      else res.status(404).send("id not found");
    })
    .catch((e) => {
      res.status(403).send(e);
    });
});
brandRouter.post("/", (req, res) => {
  const newBrand = req.body;
  getAllBrandSortById().then((data) => {
    if (data.length > 0) newBrand.Ma = data[0].Ma + 1;
    else newBrand.Ma = 1;
    if (newBrand.Ma)
      createBrand(newBrand).then((data) => {
        res.json(data);
      });
  });
});
brandRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const brand = req.body;
  updateBrand(id, brand).then((data) => {
    if (data) res.json(data);
    else res.status(404).send("không tìm thấy thương hiệu");
  });
});

brandRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    getBrandByIdOfMongo(id).then((data) => {
      if (data)
        getProductByIdOfBrand(data.Ma).then((data) => {
          if (data.length > 0) {
            res.json({ delete: false });
          } else
            deleteBrand(id).then((data) => {
              res.json({ delete: true, brand: data });
            });
        });
      else res.status(404).send("không tìm thấy thuong hieu");
    });
  } else res.status(404).send("không có tìm thấy mã");
});
export default brandRouter;
