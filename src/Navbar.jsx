import React from "react";
import { useCorrectAnswers } from "./CorrectAnswersContext";

const Navbar = () => {
  const { correctAnswersCount } = useCorrectAnswers();

  return (
    <nav style={styles.navbar}>
      <strong>Sky's & Sasha's school</strong>
      <div>Correct Answers: {correctAnswersCount}</div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
  },
};

export default Navbar;