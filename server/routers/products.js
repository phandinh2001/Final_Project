import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getAllProductsSortById,
  getProductById,
  getProductByIdNumber,
  getProductByIdOfDetailCate,
  getProductByIdOfSupplier,
  getProductBySortQuantity,
  searchProductByName,
  searchProductByNameAndIdCate,
  updateColorAndSize,
  updateProduct,
  updateQuantityOfSizeAndColor,
} from "../DAL/models/productModel";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  getAllProduct().then((data) => {
    res.json({ count: data.length, products: data });
  });
});
productRouter.get("/getProductByIdNumber", (req, res) => {
  const { id } = req.query;
  getProductByIdNumber(id).then((data) => {
    res.json(data);
  });
});
productRouter.get("/getProductByIdOfSupplier", (req, res) => {
  const { id } = req.query;
  getProductByIdOfSupplier(id).then((data) => {
    res.json({ count: data.length, products: data });
  });
});

productRouter.get("/getProductById/:id", (req, res) => {
  const { id } = req.params;
  if (id)
    getProductById(id)
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).send("not found id");
      })
      .catch((e) => {
        res.status(404).send("not found id");
      });
  else res.status(404).send("not found id");
});

productRouter.get("/getProductByIdOfDetailCate/:id", (req, res) => {
  const { id } = req.params;
  if (id)
    getProductByIdOfDetailCate(id)
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).send("not found id");
      })
      .catch((e) => {
        res.status(404).send("not found id");
      });
  else res.status(404).send("not found id");
});


productRouter.get("/searchProductByName", (req, res) => {
  const { Ten } = req.query;
  searchProductByName(Ten)
    .then((data) => {
      if (data) res.json(data);
      else res.status(404).send("not found name");
    })
    .catch((e) => {
      res.status(404).send("not found name");
    });
});

productRouter.get("/searchProductByNameAndIdCate", (req, res) => {
  const { Ten, MaLoai } = req.query;
  searchProductByNameAndIdCate(Ten, MaLoai)
    .then((data) => {
      if (data) res.json(data);
      else res.status(404).send("not found name");
    })
    .catch((e) => {
      res.status(404).send("not found name");
    });
});

productRouter.get("/getInventoryAndSold", (req, res) => {

  getProductBySortQuantity().then(data => {
    res.json(data)
  })

});

productRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteProductById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(403).send("delete fail");
    });
});
productRouter.post("/", (req, res) => {
  const product = req.body;
  getAllProductsSortById().then((data) => {
    if (data.length > 0) product.Ma = data[0].Ma + 1;
    else product.Ma = 1;
    if (product.Ma)
      createProduct(product).then((data) => {
        res.json(data);
      });
  });
});

productRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const product = req.body;
  updateProduct(id, product).then((data) => {
    updateColorAndSize({ Ma: data.Ma, KichThuoc_Mau: product.KichThuoc_Mau })
    res.json(data);
  });
});

productRouter.post("/updateQuantityOfSizeAndColor", (req, res) => {
  const { id, color, size, quantity, quantityAll } = req.body;
  updateQuantityOfSizeAndColor(id, color, size, quantity, quantityAll).then(data => {
    res.json(data)
  })
})

productRouter.put("/updateQuantity/:id", (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  // console.log(quantity);
  updateProduct(id, { SoLuong: quantity }).then((data) => {
    res.json(data);
  });
});
productRouter.put("/updateColorAndSize/:id", (req, res) => {
  const { id } = req.params;
  const { KichThuoc_Mau } = req.body;
  updateColorAndSize({ Ma: id, KichThuoc_Mau: KichThuoc_Mau }).then(data => {
    res.json(data);
  })
});
export default productRouter;
