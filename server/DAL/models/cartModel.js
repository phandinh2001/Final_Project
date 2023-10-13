import mongoose from 'mongoose';
import { CartSchema } from '../schemas/cartSchema';


const model = mongoose.model("giohangs", CartSchema);

export const getCartByIdClient = (id) => {
  return model.find({ MaKH: id }).exec();
};
export const updateCart = (id, cart) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      SoLuong: cart.SoLuong
    }
  });
};
export const deleteCartItem = (id) => {
  return model.findByIdAndDelete(id).exec();
};

export const createCartItem = (cart) => {
  return model.create(cart);
};

export const deleteManyByIdClient = (id) => {
  return model.deleteMany({ MaKH: id })
}
