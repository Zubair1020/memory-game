import {useEffect, useState} from "react";
import styles from "./App.module.css";
import Card from "./components/card/card";

const cardImages = [
  {src: "/img/helmet-1.png", matched: false},
  {src: "/img/potion-1.png", matched: false},
  {src: "/img/ring-1.png", matched: false},
  {src: "/img/scroll-1.png", matched: false},
  {src: "/img/shield-1.png", matched: false},
  {src: "/img/sword-1.png", matched: false},
];

const INIT = {
  choiceOne: null,
  choiceTow: null,
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [{choiceOne, choiceTow}, setChoice] = useState({...INIT});

  useEffect(() => {
    if (choiceOne && choiceTow) {
      setDisabled(true);
      if (choiceOne.src === choiceTow.src) {
        setCards((preVal) =>
          preVal.map((card) =>
            card.src === choiceOne.src ? {...card, matched: true} : card
          )
        );
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTow]);

  useEffect(() => {
    shuffledCards();
  }, []);

  // shuffle cards
  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((cardImage) => ({...cardImage, id: Math.random()}));

    setCards(shuffledCards);
    setTurns(0);
    setChoice({
      choiceOne: null,
      choiceTow: null,
    });
  };

  // handel a choice
  const handelChoice = (card) => {
    !choiceOne
      ? setChoice((preVal) => ({...preVal, choiceOne: card}))
      : setChoice((preVal) => ({...preVal, choiceTow: card}));
  };

  const resetTurns = () => {
    setChoice({
      choiceOne: null,
      choiceTow: null,
    });
    setTurns(turns + 1);
    setDisabled(false);
  };

  return (
    <div className={styles.app}>
      <h1>Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>

      <div className={styles.card_gird}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handelChoice={handelChoice}
            flipped={card === choiceOne || card === choiceTow || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
