import express from "express";
import { createAdmin, deleteAdminById, getAdminById, getAdminByPhone, getAllAdmins, getAllAdminsSortById, updateAdmin } from "../DAL/models/AdminModel";

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  getAllAdmins().then((data) => {
    res.json({ count: data.length, admins: data });
  });
});
adminRouter.get("/getAdminByPhone", (req, res) => {
  const { phone } = req.query;
  getAdminByPhone(phone).then((data) => {
    res.json(data);
  });
});
adminRouter.get("/getAdminById/:id", (req, res) => {
  const { id } = req.params;
  getAdminById(id).then((data) => {
    res.json(data);
  });
});

adminRouter.post("/", (req, res) => {
  const admin = req.body;
  admin.NgaySinh = new Date(admin.NgaySinh);
  admin.DiaChi = admin.DiaChi ? admin.DiaChi : "";
  admin.GioiTinh = admin.GioiTinh ? admin.GioiTinh : "";
  admin.Email = admin.Email ? admin.Email : "";
  getAllAdminsSortById().then((data) => {
    if (data.length > 0) admin.Ma = data[0].Ma + 1;
    else admin.Ma = 1;
    if (admin.Ma)
      createAdmin(admin).then((data) => {
        res.json(data);
      });
  });
});

adminRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const admin = req.body;
  updateAdmin(id, admin).then((data) => {
    if (data) res.json(data);
    else res.status(404).send("không tìm thấy quan ly");
  });
});
// adminRouter.get("/adminById", (req, res) => {
//   const id = req.query.id;
//   getadminById(id)
//     .then((data) => {
//       if (data) res.json(data);
//       else res.status(404).send("id not found");
//     })
//     .catch((e) => {
//       res.status(403).send(e);
//     });
// });
adminRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id)
    deleteAdminById(id).then((data) => {
      res.json(data);
    });
  else res.status(404).send("không có id");
});

// adminRouter.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const admin = req.body;
//   updateadminById(id, admin).then((data) => {
//     if (data) res.json(data);
//     else res.status(404).send("không tìm thấy loại sản phẩm");
//   });
// });

// adminRouter.post("/", (req, res) => {
//   const admin = req.body;
//   getAllCategoriesSortById().then((data) => {
//     if (data.length > 0) admin.Ma = data[0].Ma + 1;
//     else admin.Ma = 1;
//     if (admin.Ma)
//       createadmin(admin).then((data) => {
//         res.json(data);
//       });
//   });
// });
export default adminRouter;
