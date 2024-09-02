import React, { useState } from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext"; // Import the hook

const MathGame = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const { incrementCorrectAnswers } = useCorrectAnswers(); // Use the context

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 5);
    const num2 = Math.floor(Math.random() * 5);
    const correctAnswer = num1 + num2;
    const wrongAnswer1 = correctAnswer + Math.floor(Math.random() * 3) + 1;
    const wrongAnswer2 = correctAnswer - Math.floor(Math.random() * 3) - 1;
    const answers = [correctAnswer, wrongAnswer1, wrongAnswer2].sort(
      () => Math.random() - 0.5
    );
    return { num1, num2, correctAnswer, answers };
  }

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === question.correctAnswer) {
      setFeedback("Great job Sasha! 🎉");
      incrementCorrectAnswers(); // Increment the correct answers count
    } else {
      setFeedback("Oops! Try again Sasha. 😊");
    }
  };

  const handleNextQuestion = () => {
    setQuestion(generateQuestion());
    setSelectedAnswer(null);
    setFeedback("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sasha's Math Game 🎲</h1>
      <div style={styles.question}>What is {question.num1} + {question.num2}?</div>
      <div style={styles.answers}>
        {question.answers.map((answer) => (
          <button
            key={answer}
            style={{
              ...styles.button,
              backgroundColor:
                selectedAnswer === answer
                  ? answer === question.correctAnswer
                    ? "lightgreen"
                    : "lightcoral"
                  : "lightblue",
            }}
            onClick={() => handleAnswerClick(answer)}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        ))}
      </div>
      {feedback && <div style={styles.feedback}>{feedback}</div>}
      <button style={styles.nextButton} onClick={handleNextQuestion}>
        Next Question ➡️
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
  },
  feedback: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  nextButton: {
    padding: "10px 20px",
    fontSize: "1.2em",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default MathGame;