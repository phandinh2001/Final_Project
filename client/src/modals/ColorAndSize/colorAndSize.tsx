import { InputField } from "@gapo_ui/components";
import React, { useState } from "react";
import { Modal, Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { IconIc24FillXmark } from "@gapo_ui/icon";

import { useInput } from "../../hooks/useInput";
import {
  checkErrValidateForm,
  isEmpty,
  validateNumber,
  validateSize,
} from "../../helpers/validator";
import {
  createColorAndSize,
  deleteColor,
  deleteSizeOfColor,
  updateColorAndSize,
} from "../../stores/slices/colorAndSizeSlice";
import { RootState } from "../../stores";
interface Props {
  openModel: boolean;
  setOpenModel: (val: boolean) => void;
  setCount: (val: any) => void;
}
const ColorAndSize = ({ openModel, setOpenModel, setCount }: Props) => {
  const color = useInput("", isEmpty);
  const size = useInput("", validateSize);
  const quantity = useInput("", validateNumber);
  const [colorCurrent, setColorCurrent] = useState(null);
  const [sizeCurrent, setSizeCurrent] = useState(null);
  const [quantityCurrent, setQuantityCurrent] = useState(null);
  const [disableBtnUp, setDisableBtnUp] = useState(true);
  const { colorAndSize } = useSelector(
    (state: RootState) => state.colorAndSize
  );
  const dispatch = useDispatch();

  const handleCloseModel = () => {
    setOpenModel(false);
  };

  const handleCreateSizeAndColor = () => {
    setDisableBtnUp(true);
    if (isErr() === false) {
      setCount((prev) => prev + Number(quantity.value));
      dispatch(
        createColorAndSize({
          color: color.value,
          size: size.value,
          quantity: Number(quantity.value),
        })
      );
    }
  };
  const handleUpdateSizeAndColor = () => {
    if (isErr() === false) {
      if (quantity.value !== quantityCurrent)
        setCount(
          (prev) => prev - Number(quantityCurrent) + Number(quantity.value)
        );
      dispatch(
        updateColorAndSize({
          colorCurrent,
          sizeCurrent,
          quantityCurrent: Number(quantityCurrent),
          colorNew: color.value,
          sizeNew: size.value,
          quantityNew: Number(quantity.value),
        })
      );
      setDisableBtnUp(true);
    }
  };

  const isErr = () => {
    return checkErrValidateForm(color.err(), size.err(), quantity.err());
  };
  const onChangeColor = (e: any) => {
    color.setValue(e.target.value);
  };
  const onChangeSize = (e: any) => {
    size.setValue(e.target.value.toLocaleUpperCase());
  };
  const onChangeQuantity = (e: any) => {
    if (e.target.value !== "-") quantity.setValue(e.target.value);
  };

  const handleClickItemColorAndSize = (c: any, s: any, q: any) => {
    setColorCurrent(c);
    setSizeCurrent(s);
    setQuantityCurrent(q);
    color.setValue(c);
    size.setValue(s);
    quantity.setValue(q);
    setDisableBtnUp(false);
  };
  const handleDeleteColor = (val: any) => {
    let q = 0;
    dispatch(deleteColor(val[0]));
    Object.entries(val[1]).forEach((valSize, ind) => {
      q += Number(valSize[1]);
    });
    setCount((prev) => prev - Number(q));
  };
  const handleDeleteSize = (c: any, s: any, q: any) => {
    setCount((prev) => prev - Number(q));
    dispatch(deleteSizeOfColor({ color: c, size: s }));
  };
  const handleClickColor = (c: any) => {
    color.setValue(c);
  };
  return (
    <>
      <Modal open={openModel}>
        <Modal.Header>
          <Modal.Title>Thêm màu và kích thước</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrapper-color-size">
            <div className="left">
              <div className="wrapper-input">
                <InputField
                  fullWidth
                  label="Màu sắc"
                  value={color.value}
                  helperText={color.helperText}
                  error={color.isErr}
                  onChange={onChangeColor}
                />
              </div>
              <div className="wrapper-input">
                <InputField
                  fullWidth
                  label="Kích thước"
                  value={size.value}
                  helperText={size.helperText}
                  error={size.isErr}
                  onChange={onChangeSize}
                />
              </div>
              <div className="wrapper-input">
                <InputField
                  fullWidth
                  label="Số lượng"
                  value={quantity.value}
                  helperText={quantity.helperText}
                  error={quantity.isErr}
                  onChange={onChangeQuantity}
                />
              </div>
              <div className="wrapper-btn-color-size">
                <div className="wrapper-input">
                  <Button
                    appearance="primary"
                    onClick={handleCreateSizeAndColor}
                    disabled={!disableBtnUp}
                  >
                    Thêm
                  </Button>
                </div>
                <div className="wrapper-input">
                  <Button
                    appearance="ghost"
                    onClick={handleUpdateSizeAndColor}
                    disabled={disableBtnUp}
                  >
                    Sửa
                  </Button>
                </div>
              </div>
            </div>
            <div className="right">
              {colorAndSize && (
                <table>
                  <tbody>
                    {Object.entries(colorAndSize).map((val, ind) => {
                      const size = val[1];
                      return (
                        <tr key={ind}>
                          <td style={{ width: "20px" }}>
                            <div
                              className="mark"
                              onClick={() => handleDeleteColor(val)}
                            >
                              <IconIc24FillXmark size={10} />
                            </div>
                          </td>
                          <td
                            className="color-item"
                            onClick={() => handleClickColor(val[0])}
                          >
                            {val[0]}
                          </td>
                          <td>
                            {size! &&
                              Object.entries(size).map((valSize, ind) => {
                                const hr =
                                  Object.entries(size).length - 1 !== ind ? (
                                    <div className="line" />
                                  ) : (
                                    ""
                                  );
                                return (
                                  <div key={ind} className="wrapper-Item-size">
                                    <div
                                      className="mark"
                                      onClick={() =>
                                        handleDeleteSize(
                                          val[0],
                                          valSize[0],
                                          valSize[1]
                                        )
                                      }
                                    >
                                      <IconIc24FillXmark size={10} />
                                    </div>
                                    <div style={{ width: "100%" }}>
                                      <div
                                        className={`table-size-quantity`}
                                        onClick={() =>
                                          handleClickItemColorAndSize(
                                            val[0],
                                            valSize[0],
                                            valSize[1]
                                          )
                                        }
                                      >
                                        <div style={{ width: "45px" }}>
                                          {valSize[0]}
                                        </div>
                                        <span>:</span>
                                        <div>{valSize[1]}</div>
                                      </div>
                                      {hr}
                                    </div>
                                  </div>
                                );
                              })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" onClick={handleCloseModel}>
            Hoàn tất
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ColorAndSize;
