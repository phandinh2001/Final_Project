import express from "express";
import {
  createDetailPro,
  deleteDetailProById,
  getAllDetailPro,
  getDetailProById,
  updateDetailPro,
} from "../DAL/models/detailProductModel";

const detailProRouter = express.Router();

detailProRouter.get("/", (req, res) => {
  getAllDetailPro().then((data) => {
    res.json({ count: data.length, detailProduct: data });
  });
});

detailProRouter.get("/getDetailProductById/:id", (req, res) => {
  const id = req.params.id;
  getDetailProById(id).then((data) => {
    res.json(data);
  });
});

detailProRouter.post("/", (req, res) => {
  const detailPro = req.body;
  createDetailPro(detailPro).then((data) => {
    res.json(data);
  });
});

detailProRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  getDetailProById(id).then((data) => {
    if (data.length > 0)
      deleteDetailProById(data[0]._id).then((d) => {
        res.json(d);
      });
  });
});
detailProRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ChiTiet } = req.body;
  updateDetailPro(id, ChiTiet).then((d) => {
    res.json(d);
  });
});
export default detailProRouter;
