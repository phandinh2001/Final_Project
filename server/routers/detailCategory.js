import express from "express";
import {
  createDetailCategory,
  deleteDetailCateById,
  getAllDetailCateSortById,
  getAllDetailCategory,
  getDetailCateByIdOfMongo,
  getDetailCategoryById,
  updateDetailCate,
} from "../DAL/models/detailCategoryModel";
import { getProductByIdOfDetailCate } from "../DAL/models/productModel";

const detailCategoryRouter = express.Router();

detailCategoryRouter.get("/", (req, res) => {
  getAllDetailCategory().then((data) => {
    res.json({ count: data.length, detailCategory: data });
  });
});
detailCategoryRouter.get("/detailCategoryById", (req, res) => {
  const id = req.query.id;
  getDetailCategoryById(id)
    .then((data) => {
      if (data) res.json(data);
      else res.status(404).send("id not found");
    })
    .catch((e) => {
      res.status(403).send(e);
    });
});

detailCategoryRouter.post("/", (req, res) => {
  const detailCate = req.body;
  getAllDetailCateSortById().then((data) => {
    if (data.length > 0) detailCate.Ma = data[0].Ma + 1;
    else detailCate.Ma = 1;
    if (detailCate.Ma)
      createDetailCategory(detailCate).then((data) => {
        res.json(data);
      });
  });
});

detailCategoryRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    getDetailCateByIdOfMongo(id).then((data) => {
      if (data) getProductByIdOfDetailCate(data.Ma).then((data) => {
        if (data.length>0) {
          res.json({ delete: false });
        } else
          deleteDetailCateById(id).then((data) => {
            res.json({ delete: true, detailCate: data });
          });
      });
      else res.status(404).send("không tìm thấy chi tiết loại sản phẩm");
    });
  }
  else res.status(404).send("không có  id");
});

detailCategoryRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const detailCate = req.body;
  updateDetailCate(id, detailCate).then((data) => {
    if (data) res.json(data);
    else res.status(404).send("không tìm thấy loại sản phẩm");
  });
});
export default detailCategoryRouter;
