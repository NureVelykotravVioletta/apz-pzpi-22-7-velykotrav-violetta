import css from "./WhyDrinkWater.module.css";

const WhyDrinkWater = () => {
  return (
    <section className={css.why_drink_water}>
      <h3 className={css.title}>Чому варто пити воду</h3>
      <ul className={css.list}>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>
            Постачання поживних речовин до всіх органів
          </div>
        </li>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>Забезпечення легень киснем</div>
        </li>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>Підтримка роботи серця</div>
        </li>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>Вивільнення перероблених речовин</div>
        </li>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>
            Забезпечення стабільності організму
          </div>
        </li>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>Підтримка нормальної температури</div>
        </li>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>
            Підтримка імунної системи, здатної протистояти хворобам
          </div>
        </li>
      </ul>
    </section>
  );
};

export default WhyDrinkWater;
