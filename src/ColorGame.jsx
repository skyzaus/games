import React, { useState } from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext"; // Import the custom hook

const ColorGame = () => {
  const colors = [
    { name: "Red", code: "#FF0000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Green", code: "#00FF00" },
    { name: "Yellow", code: "#FFFF00" },
    { name: "Purple", code: "#800080" },
  ];

  const { incrementCorrectAnswers } = useCorrectAnswers(); // Use the context
  const [colorData, setColorData] = useState(generateColor());
  const [selectedColor, setSelectedColor] = useState(null);
  const [feedback, setFeedback] = useState("");

  function generateColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const wrongColors = colors.filter(
      (color) => color.name !== randomColor.name
    );
    const options = [
      randomColor,
      ...wrongColors.sort(() => 0.5 - Math.random()).slice(0, 2),
    ].sort(() => 0.5 - Math.random());
    return { ...randomColor, options };
  }

  const handleColorClick = (color) => {
    setSelectedColor(color.name);
    if (color.name === colorData.name) {
      setFeedback("Great job Sasha! 🎨");
      incrementCorrectAnswers(); // Increment the correct answers count
    } else {
      setFeedback("Oops! Try again Sasha! 😊");
    }
  };

  const handleNextColor = () => {
    setColorData(generateColor());
    setSelectedColor(null);
    setFeedback("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Color Fun 🌈</h1>
      <div style={styles.question}>
        Which color is {colorData.name}?
      </div>
      <div style={styles.colors}>
        {colorData.options.map((color) => (
          <button
            key={color.name}
            style={{
              ...styles.button,
              backgroundColor: color.code,
              opacity:
                selectedColor === color.name
                  ? color.name === colorData.name
                    ? 1
                    : 0.5
                  : 1,
            }}
            onClick={() => handleColorClick(color)}
            disabled={selectedColor !== null}
          />
        ))}
      </div>
      {feedback && <div style={styles.feedback}>{feedback}</div>}
      <button style={styles.nextButton} onClick={handleNextColor}>
        Next Color ➡️
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
  },
  title: {
    fontSize: "2em",
    color: "#333",
  },
  question: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  colors: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  button: {
    width: "80px",
    height: "80px",
    margin: "5px",
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
    backgroundColor: "#FF6347",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ColorGame;