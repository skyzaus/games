import React, { useState, useEffect } from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext";

const AnimalSoundsGame = () => {
  const animals = [
    { name: "Cow", sound: "Moo" },
    { name: "Dog", sound: "Bark" },
    { name: "Cat", sound: "Meow" },
    { name: "Sheep", sound: "Baa" },
  ];

  const { incrementCorrectAnswers, correctAnswersCount } = useCorrectAnswers();
  const [currentAnimal, setCurrentAnimal] = useState(animals[0]);
  const [feedback, setFeedback] = useState("");
  const [soundOptions, setSoundOptions] = useState([]);

  const shuffleOptions = (correctOption) => {
    const sounds = animals.map((animal) => animal.sound);
    const filteredSounds = sounds.filter((sound) => sound !== correctOption);
    const randomSounds = filteredSounds.sort(() => 0.5 - Math.random()).slice(0, 2);
    const options = [correctOption, ...randomSounds].sort(() => 0.5 - Math.random());
    return options;
  };

  const handleNextAnimal = () => {
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setCurrentAnimal(randomAnimal);
    setFeedback("");
  };

  useEffect(() => {
    setSoundOptions(shuffleOptions(currentAnimal.sound));
  }, [currentAnimal]);

  const handleSoundClick = (sound) => {
    if (sound === currentAnimal.sound) {
      setFeedback("Correct Sasha! 🎉");
      incrementCorrectAnswers();
    } else {
      setFeedback("Try again! 😊");
    }
    setTimeout(() => {
      handleNextAnimal();
    }, 1000); // Move to the next animal after 1 second
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Animal Sounds 🐾</h2>
      <p style={styles.question}>What sound does a {currentAnimal.name} make?</p>
      <div style={styles.answers}>
        {soundOptions.map((sound) => (
          <button
            key={sound}
            style={{
              ...styles.button,
              backgroundColor: feedback && sound === currentAnimal.sound ? "#90EE90" : "lightblue",
            }}
            onClick={() => handleSoundClick(sound)}
            disabled={feedback !== ""}
          >
            {sound}
          </button>
        ))}
      </div>
      {feedback && <div style={styles.feedback}>{feedback}</div>}
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
    flexDirection: "column",
    alignItems: "center",
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
};

export default AnimalSoundsGame;