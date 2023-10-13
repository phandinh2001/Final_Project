import express from "express";
import { createCartItem, deleteCartItem, deleteManyByIdClient, getCartByIdClient, updateCart } from "../DAL/models/cartModel";

const cartRouter = express.Router();

cartRouter.get("/getCartByIdClient/:id", (req, res) => {
    const { id } = req.params
    if (id) {
        getCartByIdClient(id).then((data) => {
            res.json({ count: data.length, cart: data })
        })
    } else {
        res.status(404).send('không có mã khách hàng')
    }
});

cartRouter.put("/:id", (req, res) => {
    const { id } = req.params
    const cart = req.body
    if (id) {
        updateCart(id, cart).then((data) => {
            res.json(data)
        })
    } else {
        res.status(404).send('không có mã sản phẩm trong giỏ hàng')
    }
});
cartRouter.delete("/:id", (req, res) => {
    const { id } = req.params
    if (id) {
        deleteCartItem(id).then((data) => {
            res.json(data)
        })
    } else {
        res.status(404).send('không có mã sản phẩm trong giỏ hàng')
    }
});
cartRouter.post("/", (req, res) => {
    const cartItem = req.body;
    createCartItem(cartItem).then((data) => {
        res.json(data)
    });
});

cartRouter.delete("/deleteManyCartByIdClient/:id", (req, res) => {
    const {id} = req.params;
    deleteManyByIdClient(id).then((data) => {
        res.json(data)
    });
});
export default cartRouter;
