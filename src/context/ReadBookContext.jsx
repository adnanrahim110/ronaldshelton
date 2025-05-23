// src/context/ReadBookContext.js
import { createContext, useState } from "react";

export const ReadBookContext = createContext({
  isOpen: false,
  isLoading: false,
  openPanel: () => {},
  closePanel: () => {},
});

export const ReadBookProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openPanel = () => {
    if (isLoading || isOpen) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsLoading(false);
    }, 1000);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <ReadBookContext.Provider
      value={{ isOpen, isLoading, openPanel, closePanel }}
    >
      {children}
    </ReadBookContext.Provider>
  );
};
