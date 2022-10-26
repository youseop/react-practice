import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { defaultWords } from "./Words";

function App() {
  const [wordNum, setWordNum] = useState<number>(3);
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState<string>("");
  const [resultOfRandomWords, setResultOfRandomWords] = useState<string[]>([]);

  useEffect(() => {
    const stringifiedWordsFromLocalStorage: string | undefined =
      localStorage.words;
    if (stringifiedWordsFromLocalStorage) {
      const wordsFromLocalStorage = JSON.parse(
        stringifiedWordsFromLocalStorage
      );
      if (isStringArray(wordsFromLocalStorage)) setWords(wordsFromLocalStorage);
    } else {
      const initWords = defaultWords;
      localStorage.words = JSON.stringify(initWords);
      setWords(initWords);
    }
  }, []);

  useEffect(() => {
    if (wordNum > 0) setRandomWords();
  }, [words, wordNum]);

  const isStringArray = (data: any): data is string[] => {
    return (
      typeof data === "object" && data.length > 0 && typeof data[0] === "string"
    );
  };

  const addRandomWords = (word: string) => {
    if (word.length === 0 || words.indexOf(word) !== -1) return;
    const newWords = [...words, word];
    localStorage.words = JSON.stringify(newWords);
    setWords(newWords);
  };

  const setRandomWords = () => {
    const getRandomItem = (): string => {
      return words[Math.floor(Math.random() * words.length)];
    };
    const randomWords: string[] = [];
    for (let i = 0; i < wordNum; i++) {
      randomWords.push(getRandomItem());
    }
    setResultOfRandomWords(randomWords);
  };

  const onClickAddButton = () => {
    addRandomWords(newWord);
    setNewWord("");
  };

  return (
    <div className="App">
      <div>
        <div className="App-header">
          <div onClick={setRandomWords}>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          {resultOfRandomWords.map((word, index) => {
            return <div key={`${word}_${index}`}>{word}</div>;
          })}
          <br />
          <input
            className="new-word"
            value={newWord}
            onChange={(event) => {
              setNewWord(event.target.value);
            }}
          />
          <button onClick={onClickAddButton} id="button">
            추가
          </button>

          <input
            className="word-number"
            type="number"
            onChange={(event) => {
              setWordNum(Number(event.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
