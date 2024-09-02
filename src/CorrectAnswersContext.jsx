import React, { createContext, useContext, useState } from "react";

// Create Context
const CorrectAnswersContext = createContext();

// Context Provider Component
export const CorrectAnswersProvider = ({ children }) => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const incrementCorrectAnswers = () => {
    setCorrectAnswersCount((prevCount) => prevCount + 1);
  };

  return (
    <CorrectAnswersContext.Provider value={{ correctAnswersCount, incrementCorrectAnswers }}>
      {children}
    </CorrectAnswersContext.Provider>
  );
};

// Custom hook to use the CorrectAnswersContext
export const useCorrectAnswers = () => {
  return useContext(CorrectAnswersContext);
};