import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getAllCategoriesSortById,
  getCategoryById,
  getCategoryByIdOfMongo,
  updateCategoryById,
} from "../DAL/models/CategoryModel";
import { getDetailCategoryByIdOfCate } from "../DAL/models/detailCategoryModel";

const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) => {
  getAllCategories().then((data) => {
    res.json({ count: data.length, categories: data });
  });
});
categoryRouter.get("/categoryById", (req, res) => {
  const id = req.query.id;
  getCategoryById(id)
    .then((data) => {
      if (data) res.json(data);
      else res.status(404).send("id not found");
    })
    .catch((e) => {
      res.status(403).send(e);
    });
});
categoryRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id)
    getCategoryByIdOfMongo(id).then((data) => {
      if (data) {
        getDetailCategoryByIdOfCate(data.Ma).then((data) => {
          if (data.length) {
            res.json({ delete: false });
          } else
            deleteCategoryById(id).then((data) => {
              res.json({ delete: true, category: data });
            });
        });
      } else res.status(404).send("không tìm thấy loại sản phẩm");
    });
  else res.status(404).send("không có id");
});

categoryRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const category = req.body;
  updateCategoryById(id, category).then((data) => {
    if (data) res.json(data);
    else res.status(404).send("không tìm thấy loại sản phẩm");
  });
});

categoryRouter.post("/", (req, res) => {
  const category = req.body;
  getAllCategoriesSortById().then((data) => {
    if (data.length > 0) category.Ma = data[0].Ma + 1;
    else category.Ma = 1;
    if (category.Ma)
      createCategory(category).then((data) => {
        res.json(data);
      });
  });
});
export default categoryRouter;
