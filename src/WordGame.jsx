import React, { useState } from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext"; // Import the custom hook

const WordGame = () => {
  const words = [
    { word: "c_t", correctLetter: "a" },
    { word: "d_g", correctLetter: "o" },
    { word: "f_sh", correctLetter: "i" },
    { word: "b_t", correctLetter: "a" },
    { word: "s_n", correctLetter: "u" },
    { word: "c_n", correctLetter: "a" },
    { word: "r_n", correctLetter: "u" },
    { word: "a_d", correctLetter: "n" },
    { word: "c_r", correctLetter: "a" },
  ];

  const [wordData, setWordData] = useState(generateWord());
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [feedback, setFeedback] = useState("");
  
  const { incrementCorrectAnswers } = useCorrectAnswers(); // Use the context

  function generateWord() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const wrongLetters = ["e", "i", "o", "u"].filter(
      (letter) => letter !== randomWord.correctLetter
    );
    const options = [
      randomWord.correctLetter,
      ...wrongLetters.sort(() => 0.5 - Math.random()).slice(0, 2),
    ].sort(() => 0.5 - Math.random());
    return { ...randomWord, options };
  }

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    if (letter === wordData.correctLetter) {
      setFeedback("Nice job Sasha! 🎉");
      incrementCorrectAnswers(); // Increment the correct answers count
    } else {
      setFeedback("Try again Sasha! 😊");
    }
  };

  const handleNextWord = () => {
    setWordData(generateWord());
    setSelectedLetter(null);
    setFeedback("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Word Fun 📝</h1>
      <div style={styles.question}>Complete the word: {wordData.word}</div>
      <div style={styles.letters}>
        {wordData.options.map((letter) => (
          <button
            key={letter}
            style={{
              ...styles.button,
              backgroundColor:
                selectedLetter === letter
                  ? letter === wordData.correctLetter
                    ? "lightgreen"
                    : "lightcoral"
                  : "lightblue",
            }}
            onClick={() => handleLetterClick(letter)}
            disabled={selectedLetter !== null}
          >
            {letter}
          </button>
        ))}
      </div>
      {feedback && <div style={styles.feedback}>{feedback}</div>}
      <button style={styles.nextButton} onClick={handleNextWord}>
        Next Word ➡️
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    backgroundColor: "#e6e6fa",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  title: {
    fontSize: "2em",
    color: "#333",
  },
  question: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  letters: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    margin: "5px",
    fontSize: "1.2em",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  feedback: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  nextButton: {
    padding: "10px 20px",
    fontSize: "1.2em",
    backgroundColor: "#9370DB",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default WordGame;