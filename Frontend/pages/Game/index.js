import React from "react";
import styles from "../../styles/Home.module.css";
import GameHeader from "../../Components/gameHeader";
import { useState, useEffect } from "react";
import axios from "axios";
const arr = [];

export default function Game() {
  const [score, setScore] = useState(0);
  const [word, setWord] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [selectedWord, setSelectedWord] = useState(arr);
  const [clickLetter, setClickLetter] = useState(false);
  const [wordDisplay, setWordDisplay] = useState("");
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [apiWords, setApiWords] = useState([]);
  const [alert, setAlert] = useState("");
  const [congrats, setCongrats] = useState("");
  const [fiveLetterWord, setFiveLetterWord] = useState(["", "", "", "", ""]);
  const [fourLetterWord, setFourLetterWord] = useState(["", "", "", ""]);
  const [threeLetterWord, setThreeLetterWord] = useState(["", "", ""]);
  const [twoLetterWord, setTwoLetterWord] = useState(["", ""]);
  const [btnText, setBtnText] = useState("Start Game");
  const [stage, setStage] = useState(1);
  const [level, setLevel] = useState({
    level1: "Beginner",
    level2: "Intermediate",
    level3: "Advanced",
  });

  const fiveArr = [0, 1, 2, 3, 4];
  const fourArr = [0, 1, 2, 3];
  const threeArr = [0, 1, 2];
  const twoArr = [0, 1];

  const fetchWords = async () => {
    const response = await axios.get(
      "https://raw.githubusercontent.com/IdyUkpong/Words-Api/main/index.json"
    );
    setApiWords(response.data);
  };
  const fiveLetterWords = apiWords.filter((word) => word.length === 5);

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
    const randomWord = fiveLetterWords[randomIndex];
    const characters = randomWord.split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    const scrambledWord = characters.join("");
    const randomLetter = String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    );
    setWord(scrambledWord.toUpperCase() + randomLetter.toUpperCase());
    setWordArr(
      (scrambledWord.toUpperCase() + randomLetter.toUpperCase()).split("")
    );
    setBtnText("Restart Game");
    if (btnText === "Restart Game") {
      setScore(score - (score % 14));
      setFiveLetterWord(["", "", "", "", ""]);
      setFourLetterWord(["", "", "", ""]);
      setThreeLetterWord(["", "", ""]);
      setTwoLetterWord(["", ""]);
    }
  };

  const rearrangeWord = () => {
    const characters = word.split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    const scrambledWord = characters.join("");
    setWordArr(scrambledWord.toUpperCase().split(""));
  };

  const selectLetter = (letter, index) => {
    if (wordDisplay.length === 5) {
      return;
    }
    arr.push(letter);
    setSelectedWord(arr);
    setWordDisplay(selectedWord.join(""));
    setClickLetter(true);
    setDisabledButtons([...disabledButtons, index]);
  };

  const submitWord = () => {
    if (
      !apiWords.includes(wordDisplay.toLowerCase()) &&
      selectedWord.length > 1
    ) {
      setAlert("Invalid word");
      setTimeout(function () {
        setAlert("");
      }, 2000);
    } else {
      if (selectedWord.length < 2) {
        return;
      } else if (selectedWord.length === 2 && twoLetterWord.includes("")) {
        setTwoLetterWord(wordDisplay.split(""));
        setScore(score + 2);
      } else if (selectedWord.length === 3 && threeLetterWord.includes("")) {
        setThreeLetterWord(wordDisplay.split(""));
        setScore(score + 3);
      } else if (selectedWord.length === 4 && fourLetterWord.includes("")) {
        setFourLetterWord(wordDisplay.split(""));
        setScore(score + 4);
      } else if (selectedWord.length === 5 && fiveLetterWord.includes("")) {
        setFiveLetterWord(wordDisplay.split(""));
        setScore(score + 5);
      }
    }
    arr.length = 0;
    setClickLetter(false);
    setDisabledButtons([]);
    setWordDisplay("");
  };

  const newGame = () => {
    if (
      !fiveLetterWord.includes("") &&
      !fourLetterWord.includes("") &&
      !threeLetterWord.includes("") &&
      !twoLetterWord.includes("")
    ) {
      setCongrats("Congratulations you can now proceed to the next stage");
      setTimeout(function () {
        setWordArr([]);
        setDisabledButtons([]);
        setFiveLetterWord(["", "", "", "", ""]);
        setFourLetterWord(["", "", "", ""]);
        setThreeLetterWord(["", "", ""]);
        setTwoLetterWord(["", ""]);
        setCongrats("");
        setStage(stage + 1);
        startGame();
      }, 3000);
    }
  };

  const clearWord = () => {
    arr.length = 0;
    setSelectedWord(arr);
    setWordDisplay(selectedWord.join(""));
    setDisabledButtons([]);
  };

  useEffect(() => {
    newGame();
    fetchWords();
  }, [newGame]);

  return (
    <div className={styles["game-ctn"]}>
      <div className={styles["game-ctn"]}>
        <GameHeader />
        <div className={styles["game-body-ctn"]}>
          <div>
            {!congrats && (
              <div className={styles["score"]}>
                <span>{score} SMC</span>
              </div>
            )}
          </div>
          {!congrats && (
            <div className={styles["stage"]}>
              <span>{level.level1}</span>
              <span>Stage {stage}</span>
            </div>
          )}
          {!congrats && (
            <div className={styles["input-container"]}>
              <div className={styles["first-row"]}>
                {fiveArr.map((index) => (
                  <input
                    key={index}
                    type="text"
                    value={fiveLetterWord[index]}
                    className={styles["input-field"]}
                    disabled
                  />
                ))}
              </div>
              <div className={styles["second-row"]}>
                {fourArr.map((index) => (
                  <input
                    key={index}
                    type="text"
                    value={fourLetterWord[index]}
                    className={styles["input-field"]}
                    disabled
                  />
                ))}
              </div>
              <div className={styles["second-row"]}>
                {threeArr.map((index) => (
                  <input
                    key={index}
                    type="text"
                    value={threeLetterWord[index]}
                    className={styles["input-field"]}
                    disabled
                  />
                ))}
              </div>
              <div className={styles["second-row"]}>
                {twoArr.map((index) => (
                  <input
                    key={index}
                    type="text"
                    value={twoLetterWord[index]}
                    className={styles["input-field"]}
                    disabled
                  />
                ))}
              </div>
            </div>
          )}
          {congrats && <h1 className={styles["congrats"]}>{congrats}</h1>}

          <div className={styles["container"]}>
            {!congrats && (
              <div className={styles["box"]}>
                <div>{alert}</div>
                {clickLetter && (
                  <div className={styles["word-display"]}>
                    {wordDisplay} <button onClick={submitWord}>Submit</button>
                    <button onClick={clearWord}>Clear</button>
                  </div>
                )}
                <div className={styles["letter-btns"]}>
                  {wordArr.map((letter, index) => (
                    <button
                      key={index}
                      className={styles["word-btn"]}
                      onClick={() => {
                        selectLetter(letter, index);
                      }}
                      disabled={disabledButtons.includes(index)}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                <div className={styles["btns"]}>
                  <button className={styles["start-btn"]} onClick={startGame}>
                    {btnText}
                  </button>
                  <button
                    className={styles["rearrange"]}
                    onClick={rearrangeWord}
                  >
                    Shuffle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
