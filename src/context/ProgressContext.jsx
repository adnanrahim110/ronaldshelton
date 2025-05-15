import { createContext, useContext, useState } from "react";

const ProgressContext = createContext({ progress: 0, setProgress: () => {} });

export function useProgress() {
  return useContext(ProgressContext);
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(0);
  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}
