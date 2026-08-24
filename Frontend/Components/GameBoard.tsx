import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import GameHeader from "./gameHeader";
import {
  GameRecord,
  LEVELS,
  LevelId,
  PlayMode,
  RewardBreakdown,
  Round,
  addPendingSwd,
  buildRound,
  calculateRewards,
  canFormWord,
  getPlayerId,
  isValidGuess,
  saveHistory,
  saveLocalProgress,
  scoreWord,
  SWD_SCORE_DIVISOR,
} from "../lib/game";
import { loadDictionary } from "../lib/words";
import { submitGame, syncPlayer } from "../lib/api";

type Props = {
  levelId: LevelId;
  stage: number;
  mode: PlayMode;
};

export default function GameBoard({ levelId, stage, mode }: Props) {
  const level = LEVELS[levelId];
  const [dictionary, setDictionary] = useState<string[]>([]);
  const [round, setRound] = useState<Round | null>(null);
  const [filled, setFilled] = useState<Record<number, string>>({});
  const [bonusWords, setBonusWords] = useState<string[]>([]);
  const [guess, setGuess] = useState("");
  const [used, setUsed] = useState<number[]>([]);
  const [alert, setAlert] = useState("");
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState(level.hints as number);
  const [lives, setLives] = useState(level.lives as number);
  const [secondsLeft, setSecondsLeft] = useState(level.timeLimit as number);
  const [startedAt, setStartedAt] = useState(0);
  const [loadingWords, setLoadingWords] = useState(true);
  const [failed, setFailed] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [rewards, setRewards] = useState<RewardBreakdown | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [livesLost, setLivesLost] = useState(0);

  useEffect(() => {
    getPlayerId();
    syncPlayer();
    let cancelled = false;
    loadDictionary().then((words) => {
      if (!cancelled) {
        setDictionary(words);
        setLoadingWords(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const dealRound = useCallback(() => {
    const next = buildRound(dictionary, level.wordLength, level.slots);
    if (!next) {
      setAlert("Could not build a puzzle. Try again.");
      return;
    }
    setRound(next);
    setFilled({});
    setBonusWords([]);
    setGuess("");
    setUsed([]);
    setScore(0);
    setHints(level.hints);
    setLives(level.lives);
    setSecondsLeft(level.timeLimit);
    setFailed(false);
    setCleared(false);
    setRewards(null);
    setHintsUsed(0);
    setLivesLost(0);
    setAlert("");
    setStartedAt(Date.now());
  }, [dictionary, level]);

  useEffect(() => {
    if (dictionary.length && !round && !loadingWords) dealRound();
  }, [dictionary, round, loadingWords, dealRound]);

  useEffect(() => {
    if (!round || failed || cleared) return;
    const id = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(id);
          setFailed(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [round, failed, cleared]);

  const rowComplete = (slot: number) => (filled[slot] || "").length === slot;
  const allFilled = useMemo(
    () => (level.slots as readonly number[]).every((slot) => (filled[slot] || "").length === slot),
    [filled, level.slots]
  );

  useEffect(() => {
    if (!allFilled || cleared || failed || !round) return;
    const words = [
      ...(level.slots as readonly number[]).map((slot) => filled[slot]?.toLowerCase()).filter(Boolean),
      ...bonusWords,
    ];
    const breakdown = calculateRewards({
      words,
      levelId,
      secondsLeft,
      hintsUsed,
      livesLost,
      completed: true,
      mode,
    });
    setCleared(true);
    setRewards(breakdown);
    setScore(breakdown.score);
    saveLocalProgress(levelId, stage);
    const record: GameRecord = {
      id: `${Date.now()}`,
      level: levelId,
      stage,
      mode,
      score: breakdown.score,
      swd: breakdown.swd,
      words,
      duration: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
      completed: true,
      createdAt: new Date().toISOString(),
    };
    saveHistory(record);
    if (breakdown.swd) addPendingSwd(breakdown.swd);
    submitGame(record);
  }, [allFilled, cleared, failed, round, filled, bonusWords, level.slots, levelId, secondsLeft, hintsUsed, livesLost, mode, stage, startedAt]);

  useEffect(() => {
    if (!failed || cleared || !round) return;
    const words = [
      ...(level.slots as readonly number[]).map((slot) => filled[slot]?.toLowerCase()).filter(Boolean),
      ...bonusWords,
    ];
    const breakdown = calculateRewards({
      words,
      levelId,
      secondsLeft: 0,
      hintsUsed,
      livesLost,
      completed: false,
      mode,
    });
    setRewards(breakdown);
    setScore(breakdown.score);
    const record: GameRecord = {
      id: `${Date.now()}`,
      level: levelId,
      stage,
      mode,
      score: breakdown.score,
      swd: 0,
      words,
      duration: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    saveHistory(record);
    submitGame(record);
  }, [failed, cleared, round, filled, bonusWords, level.slots, levelId, hintsUsed, livesLost, mode, stage, startedAt]);

  const flash = (message: string) => {
    setAlert(message);
    window.setTimeout(() => setAlert(""), 1600);
  };

  const selectLetter = (letter: string, index: number) => {
    if (failed || cleared || used.includes(index)) return;
    const longest = level.slots[level.slots.length - 1];
    if (guess.length >= longest) return;
    setGuess((current) => current + letter);
    setUsed((current) => [...current, index]);
  };

  const clearGuess = () => {
    setGuess("");
    setUsed([]);
  };

  const submitGuess = () => {
    if (!round || failed || cleared) return;
    const word = guess.toLowerCase();
    const letters = round.letters;
    if (!isValidGuess(word, letters, dictionary, level.slots[0])) {
      flash(!canFormWord(word, letters) ? "Those letters are not on the board" : "Not in the dictionary");
      if (level.lives > 0) {
        setLives((current) => {
          const next = current - 1;
          if (next <= 0) setFailed(true);
          return next;
        });
        setLivesLost((count) => count + 1);
      }
      clearGuess();
      return;
    }
    if (rowComplete(word.length)) {
      if (bonusWords.includes(word) || Object.values(filled).map((w) => w.toLowerCase()).includes(word)) {
        flash("Already found");
        clearGuess();
        return;
      }
      setBonusWords((current) => [...current, word]);
      setScore((current) => current + scoreWord(word.length));
      flash(`Bonus +${scoreWord(word.length)}`);
      clearGuess();
      return;
    }
    if (!(level.slots as readonly number[]).includes(word.length)) {
      setBonusWords((current) => [...current, word]);
      setScore((current) => current + scoreWord(word.length));
      flash(`Bonus +${scoreWord(word.length)}`);
      clearGuess();
      return;
    }
    setFilled((current) => ({ ...current, [word.length]: guess.toUpperCase() }));
    setScore((current) => current + scoreWord(word.length));
    clearGuess();
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!round || failed || cleared) return;
      if (event.key === "Enter") {
        event.preventDefault();
        submitGuess();
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        if (!guess) return;
        const last = used[used.length - 1];
        setGuess((current) => current.slice(0, -1));
        setUsed((current) => current.slice(0, -1));
        void last;
        return;
      }
      const key = event.key.toUpperCase();
      if (!/^[A-Z]$/.test(key)) return;
      const index = round.letters.findIndex((letter, i) => letter === key && !used.includes(i));
      if (index >= 0) selectLetter(key, index);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const useHint = () => {
    if (!round || hints <= 0 || failed || cleared) return;
    const targetLen = [...level.slots].reverse().find((slot) => !rowComplete(slot));
    if (!targetLen) return;
    const answer = round.solutions[targetLen][0].toUpperCase();
    const existing = filled[targetLen] || "";
    const next = existing + answer[existing.length];
    if (next.length === targetLen) {
      setFilled((current) => ({ ...current, [targetLen]: answer }));
      setScore((current) => current + scoreWord(targetLen));
    } else {
      setFilled((current) => ({ ...current, [targetLen]: next }));
    }
    setHints((count) => count - 1);
    setHintsUsed((count) => count + 1);
  };

  const shuffleLetters = () => {
    if (!round) return;
    const remaining = round.letters.filter((_, index) => !used.includes(index));
    const shuffled = [...remaining];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const nextLetters = [...round.letters];
    let cursor = 0;
    for (let i = 0; i < nextLetters.length; i++) {
      if (!used.includes(i)) nextLetters[i] = shuffled[cursor++];
    }
    setRound({ ...round, letters: nextLetters });
  };

  const nextHref = `/Game/play?level=${levelId}&stage=${Math.min(stage + 1, 20)}&mode=${mode}`;
  const timerPct = Math.max(0, (secondsLeft / level.timeLimit) * 100);

  return (
    <div className={styles["game-ctn"]}>
      <GameHeader />
      <div className={styles["game-body-ctn"]}>
        <div className={styles.hudBar}>
          <div>
            <strong>{level.name}</strong>
            <span>Stage {stage}</span>
          </div>
          <div className={styles.score}>{score} pts</div>
          <div>
            {mode === "earn" ? "Earn SWD" : "Practice"}
            {level.lives > 0 ? ` · Lives ${lives}` : ""}
          </div>
        </div>
        <div className={styles.timerTrack}>
          <div className={styles.timerFill} style={{ width: `${timerPct}%` }} />
        </div>
        <p className={styles.timerLabel}>{secondsLeft}s remaining</p>

        {loadingWords && <p className={styles.congrats}>Loading dictionary…</p>}
        {alert && <p className={styles.gameAlert}>{alert}</p>}

        {round && !cleared && !failed && (
          <>
            <div className={styles["input-container"]}>
              {level.slots
                .slice()
                .reverse()
                .map((slot) => (
                  <div key={slot} className={styles["second-row"]}>
                    {Array.from({ length: slot }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        value={(filled[slot] || "")[index] || ""}
                        className={styles["input-field"]}
                        disabled
                        readOnly
                      />
                    ))}
                  </div>
                ))}
            </div>
            {bonusWords.length > 0 && (
              <div className={styles.bonusRow}>
                {bonusWords.map((word) => (
                  <span key={word} className={styles.foundChip}>
                    {word}
                  </span>
                ))}
              </div>
            )}
            <div className={styles.container}>
              <div className={styles.box}>
                <div className={styles["word-display"]}>
                  {guess || "Type or tap letters"}
                  <button onClick={submitGuess}>Submit</button>
                  <button onClick={clearGuess}>Clear</button>
                </div>
                <div className={styles["letter-btns"]}>
                  {round.letters.map((letter, index) => (
                    <button
                      key={`${letter}-${index}`}
                      className={styles["word-btn"]}
                      onClick={() => selectLetter(letter, index)}
                      disabled={used.includes(index)}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                <div className={styles.btns}>
                  <button className={styles["start-btn"]} onClick={dealRound}>
                    New puzzle
                  </button>
                  <button className={styles.rearrange} onClick={shuffleLetters}>
                    Shuffle
                  </button>
                  <button className={styles.rearrange} onClick={useHint} disabled={hints <= 0}>
                    Hint ({hints})
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {(cleared || failed) && rewards && (
          <div className={styles.resultCard}>
            <h1>{cleared ? "Stage complete" : "Round over"}</h1>
            <p>
              Word score {rewards.wordScore} · Time bonus {rewards.timeBonus} · Completion{" "}
              {rewards.completion} · Penalties -{rewards.penalties}
            </p>
            <p className={styles.resultScore}>{rewards.score} pts</p>
            {mode === "earn" && cleared && (
              <p className={styles.resultFormula}>
                SWD = floor({rewards.score} ÷ {SWD_SCORE_DIVISOR}) + {level.swdBonus} bonus = {rewards.swd}
              </p>
            )}
            <p>
              {mode === "earn"
                ? cleared
                  ? `+${rewards.swd} SWD added to your pending balance. Connect a wallet to withdraw.`
                  : "No SWD this round. Finish the board before the timer to earn."
                : "Practice mode keeps the points and pays 0 SWD. Switch to Play to Earn to bank tokens."}
            </p>
            <div className={styles.btns}>
              {cleared && stage < 20 && (
                <Link href={nextHref}>
                  <button className={styles["start-btn"]}>Next stage</button>
                </Link>
              )}
              <button className={styles.rearrange} onClick={dealRound}>
                Play again
              </button>
              <Link href="/wallet">
                <button className={styles.rearrange}>Wallet</button>
              </Link>
              <Link href={`/Game/stages?level=${levelId}&mode=${mode}`}>
                <button className={styles.rearrange}>Stages</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
