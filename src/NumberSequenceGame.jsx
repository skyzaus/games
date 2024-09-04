import React, { useState } from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext";
const NumberSequenceGame = ({ onCorrectAnswer }) => {
  const [sequenceData, setSequenceData] = useState(generateSequence());
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [feedback, setFeedback] = useState("");
  const { incrementCorrectAnswers, correctAnswersCount } = useCorrectAnswers();

  function generateSequence() {
    const start = Math.floor(Math.random() * 10);
    const missingIndex = Math.floor(Math.random() * 4);
    const sequence = Array.from({ length: 5 }, (_, i) =>
      i === missingIndex ? null : start + i
    );
    const correctNumber = start + missingIndex;
    const wrongNumbers = [correctNumber + 2, correctNumber - 2].sort(
      () => 0.5 - Math.random()
    );
    const options = [correctNumber, ...wrongNumbers].sort(
      () => 0.5 - Math.random()
    );
    return { sequence, correctNumber, options };
  }

  

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    if (number === sequenceData.correctNumber) {
      setFeedback("Great job Sasha! 🎉");
      incrementCorrectAnswers(); // Increment correct answer counter
    } else {
      setFeedback("Try again! 😊");
    }
  };

  const handleNextSequence = () => {
    setSequenceData(generateSequence());
    setSelectedNumber(null);
    setFeedback("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Number Sequence ➕</h1>
      <div style={styles.question}>
        Complete the sequence:{" "}
        {sequenceData.sequence.map((num, i) =>
          num === null ? "___" : num + (i < 4 ? ", " : "")
        )}
      </div>
      <div style={styles.answers}>
        {sequenceData.options.map((number) => (
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
      <button style={styles.nextButton} onClick={handleNextSequence}>
        Next Sequence ➡️
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

export default NumberSequenceGame;