import { useState } from "react";
import css from "./todaywateritem.module.css";
import icons from "../../../assets/icons.svg";

export const TodayWaterItem = ({ amount, date, onDelete, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const formatDate = (date) => {
  //     let hours = date.getHours().toString().padStart(2, '0');
  //     let minutes = date.getMinutes().toString().padStart(2, '0');
  //     return `${hours}:${minutes}`;
  // };

  const handleOpenDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
  };

  function formatToCorrectTime(date) {
    if (!date) return;
    if (date?.length === 5) return date;
    const formattedDate = date.slice(0, -6);
    return formattedDate.length === 4 ? `0${formattedDate}` : formattedDate;
  }
  return (
    <>
      <div className={css.itemWrapper}>
        <div className={css.dateAmount}>
          <svg className={css.glass}>
            <use href={`${icons}#icon-glass`}></use>
          </svg>
          <div className={css.infoWrapper}>
            <p className={css.amount}>
              {amount === 0 ? "Drink some water" : `${amount}мл`}
            </p>
            <p className={css.date}>{formatToCorrectTime(date)}</p>
          </div>
        </div>
        <div className={css.svgWrapper}>
          <button type="button" className={css.button} onClick={onEdit}>
            <span className={css.underline}>
              <svg className={css.edit}>
                <use href={`${icons}#icon-edit`}></use>
              </svg>
            </span>
          </button>
          <button
            type="button"
            className={css.button}
            onClick={handleOpenDelete}
          >
            <span className={css.underlineRed}>
              <svg className={css.delete}>
                <use href={`${icons}#icon-delete`}></use>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modalDelete}>
            <svg className={css.crossSvg} onClick={handleCloseDelete}>
              <use href={`${icons}#icon-cross`}></use>
            </svg>
            <div className={css.deleteQuestion}>
              <p className={css.deleteEntry}>Видалити дані</p>
              <p className={css.sure}>Ви впевнені, що хочете видалити дані?</p>
            </div>
            <div className={css.choiseBtns}>
              <button onClick={handleCloseDelete}>Закрити</button>
              <button onClick={onDelete}>Видалити</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
