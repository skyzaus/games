import React, { useState } from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext"; // Import the custom hook

const DiceCountGame = () => {
  const [dice1, setDice1] = useState(rollDice());
  const [dice2, setDice2] = useState(rollDice());
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  
  const { incrementCorrectAnswers } = useCorrectAnswers(); // Use the context

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  const handleRollDice = () => {
    setDice1(rollDice());
    setDice2(rollDice());
    setUserGuess("");
    setFeedback("");
  };

  const handleCheckGuess = () => {
    const total = dice1 + dice2;
    if (parseInt(userGuess) === total) {
      setFeedback("Correct Sasha! 🎉");
      incrementCorrectAnswers(); // Increment the correct answers count
    } else {
      setFeedback("Oops! Try again Sasha! 😊");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dice Count 🎲</h1>
      <div style={styles.diceContainer}>
        <div style={styles.dice}>{dice1}</div>
        <div style={styles.dice}>{dice2}</div>
      </div>
      <div style={styles.prompt}>Count the Numbers on both dice:</div>
      <input
        type="number"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        style={styles.input}
        placeholder="Enter total"
      />
      <button style={styles.checkButton} onClick={handleCheckGuess}>
        Check Answer ✔️
      </button>
      {feedback && <div style={styles.feedback}>{feedback}</div>}
      <button style={styles.rollButton} onClick={handleRollDice}>
        Roll Dice 🎲
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
    backgroundColor: "#FFE4B5",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  title: {
    fontSize: "2em",
    color: "#333",
    marginBottom: "20px",
  },
  diceContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  dice: {
    width: "80px",
    height: "80px",
    margin: "0 10px",
    fontSize: "2em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    backgroundColor: "#FF4500",
    color: "white",
  },
  prompt: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "1.2em",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  checkButton: {
    padding: "10px 20px",
    fontSize: "1.2em",
    backgroundColor: "#32CD32",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  feedback: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  rollButton: {
    padding: "10px 20px",
    fontSize: "1.2em",
    backgroundColor: "#FF6347",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default DiceCountGame;