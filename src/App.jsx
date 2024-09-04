import React from "react";
import MathGame from "./MathGame";
import SubtractionGame from "./SubtractionGame";
import WordGame from "./WordGame";
import ColorGame from "./ColorGame";
import DiceCountGame from "./DiceCountGame";
import ShapeMatchingGame from "./ShapeMatchingGame";
import { CorrectAnswersProvider } from "./CorrectAnswersContext"; // Import the provider
import './App.css';
import Navbar from "./Navbar";
import NumberSequenceGame from "./NumberSequenceGame";
import ColorMatchingGame from "./ColorMatchingGame";
import CountingGame from "./CountingGame";
import AnimalSoundsGame from "./AnimalSoundsGame";

const App = () => {
  return (
    <CorrectAnswersProvider>
      <div>
        
        <strong><h1 className="center">Sky's & Sasha's school</h1></strong>
        <Navbar/>
        <div style={styles.appContainer}>
       
          <div style={styles.gameContainer}><MathGame /></div>
          <div style={styles.gameContainer}><SubtractionGame /></div>
          <div style={styles.gameContainer}><WordGame /></div>
          <div style={styles.gameContainer}><ColorGame /></div>
          <div style={styles.gameContainer}><DiceCountGame /></div>
          <div style={styles.gameContainer}><ShapeMatchingGame /></div>
          <div style={styles.gameContainer}><NumberSequenceGame/></div>
          <div style={styles.gameContainer}><ColorMatchingGame/></div>
          <div style={styles.gameContainer}><CountingGame/></div>
          <div style={styles.gameContainer}><AnimalSoundsGame/></div>
        </div>
        <Navbar/>
      </div>
    </CorrectAnswersProvider>
  );
};

const styles = {
  appContainer: {
    backgroundImage: `url('https://wallpapercave.com/wp/wp1987848.png')`,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "10px",
    backgroundColor: "#f0f8ff",
    overflowY: "auto",
  },
  gameContainer: {
    flex: "1 1 300px",
    minWidth: "280px",
    maxWidth: "360px",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
};

export default App;