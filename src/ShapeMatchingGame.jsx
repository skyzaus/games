import React, { useState } from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext"; // Import the custom hook

const ShapeMatchingGame = () => {
  const shapes = [
    { name: "Circle", image: "⚪" },
    { name: "Square", image: "⬛" },
    { name: "Triangle", image: "🔺" },
    { name: "Star", image: "⭐" },
    { name: "Heart", image: "❤️" },
  ];

  const [shapeData, setShapeData] = useState(generateShape());
  const [selectedShape, setSelectedShape] = useState(null);
  const [feedback, setFeedback] = useState("");
  
  const { incrementCorrectAnswers } = useCorrectAnswers(); // Use the context

  function generateShape() {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const wrongShapes = shapes.filter(
      (shape) => shape.name !== randomShape.name
    );
    const options = [
      randomShape,
      ...wrongShapes.sort(() => 0.5 - Math.random()).slice(0, 2),
    ].sort(() => 0.5 - Math.random());
    return { ...randomShape, options };
  }

  const handleShapeClick = (shape) => {
    setSelectedShape(shape.name);
    if (shape.name === shapeData.name) {
      setFeedback("Great job Sasha! 🎉");
      incrementCorrectAnswers(); // Increment the correct answers count
    } else {
      setFeedback("Not quite Sasha! Try again! 😊");
    }
  };

  const handleNextShape = () => {
    setShapeData(generateShape());
    setSelectedShape(null);
    setFeedback("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shape Matching 🟢</h1>
      <div style={styles.question}>
        Which one is a {shapeData.name}?
      </div>
      <div style={styles.shapes}>
        {shapeData.options.map((shape) => (
          <button
            key={shape.name}
            style={{
              ...styles.button,
              opacity:
                selectedShape === shape.name
                  ? shape.name === shapeData.name
                    ? 1
                    : 0.5
                  : 1,
            }}
            onClick={() => handleShapeClick(shape)}
            disabled={selectedShape !== null}
          >
            {shape.image}
          </button>
        ))}
      </div>
      {feedback && <div style={styles.feedback}>{feedback}</div>}
      <button style={styles.nextButton} onClick={handleNextShape}>
        Next Shape ➡️
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
    backgroundColor: "#E0FFFF",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  title: {
    fontSize: "2em",
    color: "#333",
    marginBottom: "20px",
  },
  question: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  shapes: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    margin: "5px",
    fontSize: "2em",
    backgroundColor: "#ADD8E6",
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
    backgroundColor: "#4682B4",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ShapeMatchingGame;