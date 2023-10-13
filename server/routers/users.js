import express from "express";
import {
  generateAccessToken,
  getAllUser,
  getMe,
  signIn,
  signUp,
  updateAccount,
} from "../DAL/models/userModel";
import { authenticateToken } from "../common/authentication";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  getAllUser().then((data) => {
    res.json({ count: data.length, users: data });
  });
});

userRouter.get("/getMe", authenticateToken, (req, res) => {
  const { phone } = req.phone;
  getMe(phone)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      throw err;
    });
});
userRouter.get("/getUserByPhone", (req, res) => {
  const { phone } = req.query;
  getMe(phone)
    .then((data) => {
      if (data.length > 0)
        res.send({ message: "Số điện thoại đã tồn tại", isPhone: false });
      else res.send({ isPhone: true, message: "" });
    })
    .catch((err) => {
      throw err;
    });
});

userRouter.post("/signIn", (req, res) => {
  const { phone, password } = req.body;
  signIn(phone, password)
    .then((data) => {
      if (data.length > 0 && !data[0].KhoaTK) {
        let token = generateAccessToken(phone);
        res.json({
          existed: true,
          token: token,
          username: data[0].Ten,
          position: data[0].PhanQuyen,
          avatar: data[0].Anh,
          phone: data[0].SDT,
        });
      } else if (data.length && data[0].KhoaTK)
        res.send({ message: "Tài khoản của bạn đã bị khóa" });
      else res.send({ message: "Số điện thoại hoặc mật khẩu không chính xác" });
    })
    .catch((err) => {
      throw err;
    });
});

userRouter.post("/signUp", (req, res) => {
  const newUser = req.body;
  newUser.NgaySinh = new Date(newUser.NgaySinh);
  newUser.PhanQuyen = newUser.PhanQuyen ? newUser.PhanQuyen : "KhachHang";
  newUser.Anh = newUser.Anh ? newUser.Anh : "";
  newUser.KhoaTK = false;
  signUp(newUser)
    .then((data) => {
      res.json({ user: data, success: true });
    })
    .catch((err) => {
      res.send(err);
    });
});

userRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const account = req.body;
  console.log(account);
  updateAccount(id, account).then((data) => {
    res.json(data);
  });
});

userRouter.post("/updatePassword", (req, res) => {
  const { phone, currentPassword, newPassword } = req.body;
  getMe(phone).then((data) => {
    if (data.length > 0) {
      if (data[0].MatKhau === currentPassword) {
        updateAccount(data[0].id, { MatKhau: newPassword })
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.send(err);
          });
      } else res.status(500).send("Mật khẩu hiện tại không chính xác.");
    } else {
      res.status(404).send("không tìm thấy số điện thoại");
    }
  });
});
userRouter.post("/updateUser", (req, res) => {
  const user = req.body;
  if (user.SDT)
    getMe(user.SDT)
      .then((data) => {
        if (data.length > 0) {
          updateAccount(data[0].id, user)
            .then((data) => {
              res.json(data);
            })
            .catch((err) => {
              res.send(err);
            });
        } else {
          res.status(404).send("không tìm thấy số điện thoại");
        }
      })
      .catch((e) => {
        res.send(e);
      });
  else res.status(404).send("không có số điện thoại");
});
export default userRouter;
