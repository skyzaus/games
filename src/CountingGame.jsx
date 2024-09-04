import React, { useState } from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext";

const CountingGame = () => {
  const [countData, setCountData] = useState(generateCount());
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [feedback, setFeedback] = useState("");

  const { incrementCorrectAnswers, correctAnswersCount } = useCorrectAnswers();

  function generateCount() {
    const correctNumber = Math.floor(Math.random() * 10) + 1;
    const objects = "🐈".repeat(correctNumber);
    const wrongNumbers = [correctNumber + 1, correctNumber - 1].sort(
      () => 0.5 - Math.random()
    );
    const options = [correctNumber, ...wrongNumbers].sort(
      () => 0.5 - Math.random()
    );
    return { objects, correctNumber, options };
  }

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    if (number === countData.correctNumber) {
      setFeedback("Great job Sasha! 🎉");
      incrementCorrectAnswers(); // Increment correct answer counter
    } else {
      setFeedback("Oops! Try again! 😊");
    }
  };

  const handleNextCount = () => {
    setCountData(generateCount());
    setSelectedNumber(null);
    setFeedback("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cat Counting 🐈</h1>
      <div style={styles.question}>{countData.objects}</div>
      <div style={styles.answers}>
        {countData.options.map((number) => (
          <button
            key={number}
            style={styles.button}
            onClick={() => handleNumberClick(number)}
            disabled={selectedNumber !== null}
          >
            {number}
          </button>
        ))}
      </div>
      {feedback && <div style={styles.feedback}>{feedback}</div>}
      <button style={styles.nextButton} onClick={handleNextCount}>
        Next ➡️
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
      backgroundColor: "#B0E0E6",
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
    answers: {
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
      backgroundColor: "lightblue",
    },
    feedback: {
      fontSize: "1.5em",
      marginBottom: "20px",
    },
    nextButton: {
      padding: "10px 20px",
      fontSize: "1.2em",
      backgroundColor: "#4682B4",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
  };

export default CountingGame;