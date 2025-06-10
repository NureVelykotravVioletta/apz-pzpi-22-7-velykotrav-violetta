import { useState } from "react";
import css from "./addwaterlist.module.css";
import icons from "../../assets/icons.svg";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateWaterRecord } from "../../redux/water/waterOperations";

export const EditWaterForm = ({ onClose, editingRecord }) => {
  const [amount, setAmount] = useState(editingRecord.amount);
  const [date, setDate] = useState(editingRecord.time);
  const dispatch = useDispatch();

  const handleTimeChange = (e) => {
    setDate(e.target.value);
  };

  const handleDec = () => {
    setAmount((prev) => (prev > 50 ? prev - 50 : 0));
  };

  const handleInc = () => {
    setAmount((prev) => (prev < 5000 ? prev + 50 : 5000));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value === "" ? "" : Number(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formAmount = Number(amount);

    if (formAmount <= 0 || formAmount > 5000) {
      toast.error("Put correct walue of water!");
      return;
    }

    dispatch(
      updateWaterRecord({
        id: editingRecord._id,
        amount: formAmount,
        time: date,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Record updated!");
      })
      .catch((error) => {
        toast.error("Record is not updated");
      });

    if (typeof onClose === "function") {
      onClose();
    } else {
      console.error("onClose is not a function");
    }
  };

  return (
    <form className={css.sectionModal} onSubmit={handleSubmit}>
      <p className={css.sectionHeader}>Редагувати зазначену кількість води</p>
      <button className={css.crossBtn} type="button" onClick={onClose}>
        <svg>
          <use href={`${icons}#icon-cross`}></use>
        </svg>
      </button>
      <div className={css.formEditInfo}>
        <div className={css.waterPreInfo}>
          <svg className={css.svgGlass}>
            <use href={`${icons}#icon-glass`}></use>
          </svg>
          <div className={css.timeAmount}>
            <span className={css.waterAmount}>
              {amount ? `${amount} мл` : "0 мл"}
            </span>
            <span className={css.spanTime}>{date}</span>
          </div>
        </div>
        <div className={css.amountCorrection}>
          <p className={css.enteredData}>Виправити введене значення:</p>
          <p>Кількість води:</p>
          <div className={css.amountCalc}>
            <button
              type="button"
              className={css.amountBtnDec}
              onClick={handleDec}
              disabled={amount === 0}
            >
              <svg>
                <use href={`${icons}#icon-decrement`}></use>
              </svg>
            </button>
            <p className={css.spanAmount}>{amount ? `${amount} мл` : "0 мл"}</p>
            <button
              type="button"
              className={css.amountBtnInc}
              onClick={handleInc}
              disabled={amount === 5000}
            >
              <svg>
                <use href={`${icons}#icon-increment`}></use>
              </svg>
            </button>
          </div>
          <div className={css.inputWrapper}>
            <p>Зазначений час:</p>
            <input
              className={css.editFormInput}
              type="time"
              step={300}
              value={date}
              onChange={handleTimeChange}
            />
          </div>
          <div className={css.inputWrapper}>
            <p className={css.numberTopic}>Введіть кількість вжитої води:</p>
            <input
              className={css.editFormInput}
              type="number"
              name="amount"
              value={amount === "" ? "" : amount}
              onChange={handleAmountChange}
            />
          </div>
        </div>
      </div>
      <div className={css.saveBtnWrapper}>
        <div className={css.finalAmountSave}>
          <p>{amount === 0 || amount === "" ? "" : `${amount} мл`}</p>
          <button type="submit">Зберегти</button>
        </div>
      </div>

      <ToastContainer />
    </form>
  );
};
