import { useDispatch, useSelector } from "react-redux";
import { updateDailyWaterIntake } from "../../redux/water/waterOperations";
import css from "./DailyNormaModal.module.css";
import { useEffect, useState } from "react";
import { closeModal, updateNorma } from "../../redux/water/waterSlice";
import { selectNorma } from "../../redux/water/waterSelectors";

const DailyNormaModal = () => {
  const [gender, setGender] = useState("woman");
  const [weight, setWeight] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [recommendedNorma, setRecommendedNorma] = useState(0);
  const [userNorma, setUserNorma] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(closeModal());
  };
  const waterNorma = useSelector(selectNorma);

  useEffect(() => {
    if (waterNorma) {
      setUserNorma(waterNorma);
    }
  }, [waterNorma]);

  const onConfirm = (newNorma) => {
    dispatch(updateNorma(newNorma));
    dispatch(closeModal());
  };

  useEffect(() => {
    const calculateNorma = () => {
      const weightNum = parseFloat(weight) || 0;
      const activityTimeNum = parseFloat(activityTime) || 0;
      let calculatedNorma = 0;

      if (gender === "man") {
        calculatedNorma = weightNum * 0.04 + activityTimeNum * 0.6;
      } else {
        calculatedNorma = weightNum * 0.03 + activityTimeNum * 0.4;
      }
      setRecommendedNorma(calculatedNorma.toFixed(1));
    };

    calculateNorma();
  }, [gender, weight, activityTime]);

  const handleSaveClick = () => {
    const intake = parseFloat(userNorma);

    if (intake <= 0) {
      setError(
        "The water intake is too small. Please enter a value greater than 0."
      );
      return;
    } else if (intake > 15) {
      setError(
        "The maximum allowable water intake is 15 liters per day. Please enter valid values within this limit."
      );
      return;
    }

    setUserNorma(userNorma);
    const newIntake = intake * 1000;

    const data = {
      dailyWaterIntake: String(newIntake),
    };

    dispatch(updateDailyWaterIntake(data))
      .unwrap()
      .then(() => {
        onConfirm(userNorma);
        onClose();
      })
      .catch((error) => {
        console.error("Failed to update daily water intake: ", error);
        setError(
          "The water intake is too small. Please enter a value greater than 0."
        );
      });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={css.modalOverlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button
          className={css.modalCloseButton}
          onClick={onClose}
          type="button"
        >
          <svg
            className={css.closeSvg}
            width="14"
            height="14"
            aria-label="close button"
          >
            <use href="/src/assets/icons.svg#icon-cross"></use>
          </svg>
        </button>
        <h2 className={css.title}>Моя денна норма</h2>
        <div>
          <div className={css.formulas}>
            <p className={css.formula}>
              Для жінки: <span className={css.blue}>V=(M*0,03) + (T*0,4)</span>
            </p>
            <p className={css.formula}>
              Для чоловіка:{" "}
              <span className={css.blue}>V=(M*0,04) + (T*0,6)</span>
            </p>
          </div>
          <p className={css.note}>
            <span className={css.dot}>*</span> V – об’єм водної норми у літрах
            на добу, M – ваша маса тіла, T – час активних занять спортом або
            іншим видом діяльності, сумірним за навантаженнями (за відсутності
            таких необхідно встановити 0)
          </p>
        </div>
        <h3 className={css.titleh3}>Розрахуйте свою норму:</h3>
        <div className={css.radio}>
          <label className={css.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="woman"
              checked={gender === "woman"}
              onChange={() => setGender("woman")}
            />
            Для жінки
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="man"
              checked={gender === "man"}
              onChange={() => setGender("man")}
            />
            Для чоловіка
          </label>
        </div>
        <div>
          <label className={css.titleInput}>Ваша вага в кілограмах:</label>
          <input
            className={css.calcInput}
            type="number"
            value={weight}
            placeholder="0"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label className={css.titleInput}>
            Час активної участі в спортивних або інших видах діяльності з
            високим фізичним навантаженням у годинах:
          </label>
          <input
            className={css.calcInput}
            type="number"
            value={activityTime}
            placeholder="0"
            min="0"
            max="24"
            onChange={(e) => setActivityTime(e.target.value)}
            onInput={(e) => {
              if (e.target.value > 24) {
                e.target.value = 24;
              } else if (e.target.value < 0) {
                e.target.value = 0;
              }
            }}
          />
        </div>
        <div>
          <div className={css.result}>
            <p className={css.total}>
              Необхідна кількість води в літрах на день:
            </p>
            <strong className={css.screen}>{recommendedNorma} Л</strong>
          </div>
        </div>
        <div>
          <label className={css.resultTitle}>
            Запишіть, скільки води ви хочете випити:
          </label>
          <input
            className={css.calcInput}
            type="number"
            placeholder="0"
            value={userNorma}
            onChange={(e) => setUserNorma(e.target.value)}
          />
        </div>
        {error && <div className={css.errorMessage}>{error}</div>}
        <button className={css.saveBtn} onClick={handleSaveClick}>
          Зберегти
        </button>
      </div>
    </div>
  );
};

export default DailyNormaModal;
