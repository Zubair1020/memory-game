import styles from "./card.module.css";

const Card = ({card, handelChoice, flipped, disabled}) => {
  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flipped : ""}>
        <img className={styles.front} src={card.src} />
        <img
          className={styles.back}
          src="/img/cover.png"
          onClick={() => !disabled && handelChoice(card)}
        />
      </div>
    </div>
  );
};

export default Card;
