import css from "./WaterConsumptionTracker.module.css";
import icon from "../../../assets/icons.svg";

const WaterConsumptionTracker = ({ onTryTrackerClick }) => {
  return (
    <section className={css.water_consumption_tracker}>
      <h1 className={css.title}>Трекер споживання води</h1>
      <h2 className={css.title_record}>
        Записуйте та відстежуйте щоденне споживання води
      </h2>
      <h3 className={css.title_list}>Переваги трекера</h3>
      <ul className={css.tracker_benefits}>
        <li className={css.benefit_item}>
          <svg className={css.icon_svg} width="32" height="32">
            <use href={`${icon}#icon-calendar-days`} />
          </svg>
          <p className={css.benefit_discrip}>Тренування звичок</p>
        </li>
        <li className={css.benefit_item}>
          <svg className={css.icon_svg} width="32" height="32">
            <use href={`${icon}#icon-presentation-bar`} />
          </svg>
          <p className={css.benefit_discrip}>Перегляд статистики</p>
        </li>
        <li className={css.benefit_item}>
          <svg className={css.icon_svg} width="32" height="32">
            <use href={`${icon}#icon-wrench-screwdriver`} />
          </svg>
          <p className={css.benefit_discrip}>Налаштування персональної норми</p>
        </li>
      </ul>
      <button className={css.button} onClick={onTryTrackerClick}>
        Спробуй трекер
      </button>
    </section>
  );
};

export default WaterConsumptionTracker;
