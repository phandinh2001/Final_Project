import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  colorAndSize: {},
};

export const colorAndSizeSlice = createSlice({
  name: "colorAndSize",
  initialState,
  reducers: {
    createColorAndSize(state, action: PayloadAction<any>) {
      const { color, size, quantity } = action.payload;
      if (color in state.colorAndSize) {
        if (size in state.colorAndSize[color]) {
          state.colorAndSize[color][size] =
            state.colorAndSize[color][size] + quantity;
        } else {
          state.colorAndSize[color] = {
            ...state.colorAndSize[color],
            [size]: quantity,
          };
        }
      } else {
        state.colorAndSize[color] = { [size]: quantity };
      }
    },
    createColorAndSizeByObject(state, action: PayloadAction<any>) {
      state.colorAndSize = action.payload;
    },
    updateColorAndSize(state, action: PayloadAction<any>) {
      const {
        colorCurrent,
        sizeCurrent,
        quantityCurrent,
        colorNew,
        sizeNew,
        quantityNew,
      } = action.payload;
      if (colorNew !== colorCurrent && sizeNew !== sizeCurrent) {
        state.colorAndSize[colorNew] = state.colorAndSize[colorCurrent];
        delete state.colorAndSize[colorCurrent];

        state.colorAndSize[colorNew][sizeNew] = quantityNew;
        delete state.colorAndSize[colorNew][sizeCurrent];
      } else if (colorNew !== colorCurrent && quantityNew !== quantityCurrent) {
        state.colorAndSize[colorNew] = state.colorAndSize[colorCurrent];
        delete state.colorAndSize[colorCurrent];

        state.colorAndSize[colorNew][sizeCurrent] = quantityNew;
      } else if (colorNew !== colorCurrent) {
        state.colorAndSize[colorNew] = state.colorAndSize[colorCurrent];
        delete state.colorAndSize[colorCurrent];
      } else if (sizeNew !== sizeCurrent) {
        state.colorAndSize[colorCurrent][sizeNew] = quantityNew;
        delete state.colorAndSize[colorCurrent][sizeCurrent];
      } else state.colorAndSize[colorCurrent][sizeCurrent] = quantityNew;
    },
    deleteColor(state, action: PayloadAction<any>) {
      delete state.colorAndSize[action.payload];
    },
    deleteSizeOfColor(state, action: PayloadAction<any>) {
      const { color, size } = action.payload;
      if (Object.keys(state.colorAndSize[color]).length <= 1) {
        delete state.colorAndSize[color];
      } else {
        delete state.colorAndSize[color][size];
      }
    },
    clearStateColorAndSize(state) {
      state.colorAndSize = {};
    },
  },
});

export const {
  createColorAndSize,
  clearStateColorAndSize,
  updateColorAndSize,
  deleteColor,
  deleteSizeOfColor,
  createColorAndSizeByObject,
} = colorAndSizeSlice.actions;

export default colorAndSizeSlice.reducer;
