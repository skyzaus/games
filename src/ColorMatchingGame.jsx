import React, { useState } from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext";

const ColorMatchingGame = () => {
  const colors = [
    { name: "Red", color: "red" },
    { name: "Blue", color: "blue" },
    { name: "Green", color: "green" },
    { name: "Yellow", color: "yellow" },
  ];

  const { incrementCorrectAnswers, correctAnswersCount } = useCorrectAnswers();
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (userAnswer.toLowerCase() === currentColor.name.toLowerCase()) {
      setFeedback("Great job Sasha! 🎉");
      incrementCorrectAnswers();
    } else {
      setFeedback("Try again! 😊");
    }
  };

  const handleNextColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);
    setUserAnswer("");
    setFeedback("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Spell the Color! 🎨</h2>
      <div style={{ ...styles.colorBox, backgroundColor: currentColor.color }}></div>
      <h3 style={styles.colorNames}>"red" "blue" "green" "yellow"</h3>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        style={styles.input}
        placeholder="Enter color name"
      />
      <button style={styles.button} onClick={handleSubmit}>
        Submit
      </button>
      {feedback && <div style={styles.feedback}>{feedback}</div>}
      <button style={styles.button} onClick={handleNextColor}>
        Next Color
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
    backgroundColor: "#FFFACD",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    color: "lightblue", // Set the text color to light blue
  },
  title: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  colorBox: {
    width: "100px",
    height: "100px",
    marginBottom: "20px",
    borderRadius: "10px",
  },
  colorNames: {
    color: "blue", // Ensure the color names also have light blue text
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
  button: {
    padding: "10px 20px",
    fontSize: "1.2em",
    backgroundColor: "#00BFFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "5px",
  },
  feedback: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  score: {
    fontSize: "1.5em",
    marginTop: "20px",
  },
};

export default ColorMatchingGame;