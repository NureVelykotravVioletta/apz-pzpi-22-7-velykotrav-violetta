import { useState, useEffect } from "react";
import icons from "../../assets/icons.svg";
import css from "./MonthStatsTable.module.css";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";
import { useDispatch, useSelector } from "react-redux";
import { fetchWaterMonthInfo } from "../../redux/water/waterOperations";
import Loader from "../Loader/Loader";
import { selectNorma } from "../../redux/water/waterSelectors";

export default function MonthStatsTable() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthsNames = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [openDay, setOpenDay] = useState(false);

  const waterItems = useSelector((state) => state.water.items);
  const isLoading = useSelector((state) => state.water.isLoading);
  const dispatch = useDispatch();
  const waterNorma = useSelector(selectNorma);

  useEffect(() => {
    const currentDate = () => {
      return { month, year };
    };
    dispatch(fetchWaterMonthInfo(currentDate));
  }, [dispatch, month, year, waterNorma]);

  const nextMonth = () => {
    setMonth((prevMonth) => {
      let newMonth = prevMonth + 1;
      let newYear = year;

      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      if (
        newYear > currentYear ||
        (newYear === currentYear && newMonth > currentMonth)
      ) {
        return prevMonth;
      }

      setYear(newYear);
      return newMonth;
    });
  };

  const prevMonth = () => {
    setMonth((prevMonth) => {
      let newMonth = prevMonth - 1;
      let newYear = year;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      setYear(newYear);
      return newMonth;
    });
  };

  const handleOpenDayInfo = (day) => {
    if (openDay === day) {
      setOpenDay(false);
    } else {
      setOpenDay(day);
    }
  };

  const handleCloseDayInfo = () => {
    setOpenDay(false);
  };

  const leftSideItems = [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25];

  return (
    <div className={css.calendarWrapper}>
      <div className={css.monthHeader}>
        <p className={css.monthTitle}>Місяць</p>
        {isLoading && <Loader />}
        <div className={css.calendarNavi}>
          <button className={css.chevronBtn} onClick={prevMonth}>
            <svg className={css.chevronBtnIcon}>
              <use href={`${icons}#icon-chevron-left`}></use>
            </svg>
          </button>
          <div className={css.monthName}>
            {monthsNames[month]}, {year}
          </div>

          <button
            onClick={nextMonth}
            className={
              month === currentMonth && year === currentYear
                ? css.chevronBtnHidden
                : css.chevronBtn
            }
          >
            <svg className={css.chevronBtnIcon}>
              <use href={`${icons}#icon-chevron-right`}></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={css.daysWrapper}>
        <ul className={css.calendar}>
          {waterItems.map((item) => (
            <li
              className={css.dayInCalendar}
              key={item.date}
              onClick={() => {
                handleOpenDayInfo(item.date);
              }}
              onMouseLeave={handleCloseDayInfo}
            >
              <div
                className={
                  parseFloat(item.percentageConsumed) < 100
                    ? css.dayItemAccentColor
                    : css.dayItem
                }
              >
                {Number(item.date.split(",")[0])}
              </div>
              <div className={css.percentDayItem}>
                {item.percentageConsumed}
              </div>
              <div>
                {openDay === item.date && (
                  <div
                    className={
                      leftSideItems.includes(Number(item.date.split(",")[0]))
                        ? css.popUpWindowLeft
                        : css.popUpWindowRight
                    }
                  >
                    <DaysGeneralStats day={openDay} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
