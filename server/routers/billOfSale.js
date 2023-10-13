import express from "express";
import {
  createBillOfSale,
  getAllBillOfSale,
  getAllBillOfSaleSortById,
  getBillOfSaleBought,
  getBillOfSaleBuying,
  getBillOfSaleById,
  getBillOfSaleByIdClient,
  getBillOfSaleCancel,
  getBillOfSaleNotCancel,
  getBillOfSaleOfClientOrderByIdClient,
  updateBillOfSale,
} from "../DAL/models/billOfSaleModel";
import { compareDate } from "../common/compareDate";

const billOfSaleRouter = express.Router();

billOfSaleRouter.get("/", (req, res) => {
  getAllBillOfSale().then((data) => {
    res.json({ count: data.length, bill: data });
  });
});

billOfSaleRouter.get("/billOfSaleById/:id", (req, res) => {
  const { id } = req.params;
  if (id)
    getBillOfSaleById(id).then((data) => {
      res.json(data);
    });
  else res.status(404).send("không tìm thấy mã");
});

billOfSaleRouter.get("/getBillOfSaleByIdClient/:id", (req, res) => {
  const { id } = req.params;
  if (id)
    getBillOfSaleByIdClient(id).then((data) => {
      res.json(data);
    });
  else res.status(404).send("không tìm thấy mã");
});
billOfSaleRouter.get("/getBillOfSaleOfClientOrderByIdClient/:id", (req, res) => {
  const { id } = req.params;
  if (id)
    getBillOfSaleOfClientOrderByIdClient(id).then((data) => {
      res.json(data);
    });
  else res.status(404).send("không tìm thấy mã");
});

billOfSaleRouter.post("/getAllRevenue", (req, res) => {
  const { dateStart, dateEnd } = req.body;
  getAllBillOfSale().then((data) => {
    const arrBill = []
    let revenue = 0
    if (data.length > 0)
      data.forEach((bill) => {
        if (compareDate(bill.Ngay, dateStart) !== -1 && compareDate(bill.Ngay, dateEnd) !== 1) {
          arrBill.push(bill)
          revenue += bill.TongTien
        }
      })
    res.json({ revenue, bills: arrBill });
  });
});

billOfSaleRouter.post("/getRevenueCancel", (req, res) => {
  const { dateStart, dateEnd } = req.body;
  getBillOfSaleCancel().then((data) => {
    const arrBill = []
    let revenue = 0
    if (data.length > 0)
      data.forEach((bill) => {
        if (compareDate(bill.Ngay, dateStart) !== -1 && compareDate(bill.Ngay, dateEnd) !== 1) {
          arrBill.push(bill)
          revenue += bill.TongTien
        }
      })
    res.json({ revenue, bills: arrBill });
  });
});

billOfSaleRouter.post("/getRevenueBought", (req, res) => {
  const { dateStart, dateEnd } = req.body;
  getBillOfSaleBought().then((data) => {
    const arrBill = []
    let revenue = 0
    if (data.length > 0)
      data.forEach((bill) => {
        if (compareDate(bill.Ngay, dateStart) !== -1 && compareDate(bill.Ngay, dateEnd) !== 1) {
          arrBill.push(bill)
          revenue += bill.TongTien
        }
      })
    res.json({ revenue, bills: arrBill });
  });
});

billOfSaleRouter.post("/getRevenueBuying", (req, res) => {
  const { dateStart, dateEnd } = req.body;
  getBillOfSaleBuying().then((data) => {
    const arrBill = []
    let revenue = 0
    if (data.length > 0)
      data.forEach((bill) => {
        if (compareDate(bill.Ngay, dateStart) !== -1 && compareDate(bill.Ngay, dateEnd) !== 1) {
          arrBill.push(bill)
          revenue += bill.TongTien
        }
      })
    res.json({ revenue, bills: arrBill });
  });
});

billOfSaleRouter.post("/getBillOfSaleNoCancel", (req, res) => {
  const { dateStart, dateEnd } = req.body;
  getBillOfSaleNotCancel().then((data) => {
    const arrBill = []
    if (data.length > 0)
      data.forEach((bill) => {
        if (compareDate(bill.Ngay, dateStart) !== -1 && compareDate(bill.Ngay, dateEnd) !== 1) {
          arrBill.push(bill)
        }
      })
    res.json({ count: arrBill.length, bill: arrBill });
  });
});

billOfSaleRouter.get("/getBillBoughtOfYear", (req, res) => {
  const { year } = req.query;
  const listBillOfMonth = new Array(13).fill(0)
  getBillOfSaleBought().then((data) => {
    if (data.length > 0) {
      const arrBill = data.filter((bill) => (Number(new Date(bill.Ngay).getFullYear()) === Number(year)))
      if (arrBill.length < 1) res.json(listBillOfMonth);
      else {
        arrBill.forEach((val) => {
          listBillOfMonth[Number(new Date(val.Ngay).getMonth()) + 1] += Number(val.TongTien);
        })
        res.json(listBillOfMonth)
      }

    }
    else res.json(listBillOfMonth);
  });
});

billOfSaleRouter.get("/getBillBuyingOfYear", (req, res) => {
  const { year } = req.query;
  const listBillOfMonth = new Array(13).fill(0)
  getBillOfSaleBuying().then((data) => {
    if (data.length > 0) {
      const arrBill = data.filter((bill) => (Number(new Date(bill.Ngay).getFullYear()) === Number(year)))
      if (arrBill.length < 1) res.json(listBillOfMonth);
      else {
        arrBill.forEach((val) => {
          listBillOfMonth[Number(new Date(val.Ngay).getMonth()) + 1] += Number(val.TongTien);
        })
        res.json(listBillOfMonth)
      }

    }
    else res.json(listBillOfMonth);
  });
});

billOfSaleRouter.get("/getBillCancelOfYear", (req, res) => {
  const { year } = req.query;
  const listBillOfMonth = new Array(13).fill(0)
  getBillOfSaleCancel().then((data) => {
    if (data.length > 0) {
      const arrBill = data.filter((bill) => (Number(new Date(bill.Ngay).getFullYear()) === Number(year)))
      if (arrBill.length < 1) res.json(listBillOfMonth);
      else {
        arrBill.forEach((val) => {
          listBillOfMonth[Number(new Date(val.Ngay).getMonth()) + 1] += Number(val.TongTien);
        })
        res.json(listBillOfMonth)
      }

    }
    else res.json(listBillOfMonth);
  });
});

// billOfSaleRouter.post("/getBillOfSaleNoCancelByMongoDB", (req, res) => {
//   // const { dateStart, dateEnd } = req.body;
//   const dateStart = "5-17-2023"
//   const dateEnd ="5-19-2023"
//   getBillOfSaleNotCancelByMongoDB(dateStart, dateEnd).then((data) => {
//     res.json({ count: data.length, bill: data });
//   });
// });


billOfSaleRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const bill = req.body;
  updateBillOfSale(id, bill).then((data) => {
    res.json(data);
  }).catch((e)=>{
    res.status(404).send("không tìm thấy hóa đơn");
  });
});

billOfSaleRouter.post("/", (req, res) => {
  const bill = req.body;
  bill.Huy = bill.Huy ? bill.Huy : false;
  bill.PhuongThucTT = bill.PhuongThucTT ? bill.PhuongThucTT : "Tiền mặt";
  bill.ThanhToan = bill.ThanhToan ? bill.ThanhToan : false;
  bill.TrangThai = bill.TrangThai ? bill.TrangThai : "Đang xử lý";
  bill.NguoiLap = bill.NguoiLap ? bill.NguoiLap : "QuanLy";
  bill.Ngay = bill.Ngay ? new Date(bill.Ngay) : new Date();
  getAllBillOfSaleSortById().then((data) => {
    if (data.length > 0) bill.MaHD = data[0].MaHD + 1;
    else bill.MaHD = 1;
    if (bill.MaHD)
      createBillOfSale(bill).then((data) => {
        res.json(data);
      });
  });
});
export default billOfSaleRouter;
