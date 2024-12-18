"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  darkMode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const darkModePreference = localStorage.getItem("theme") as ThemeMode | null;

    if (darkModePreference === "dark" || darkModePreference === "light") {
      setDarkMode(darkModePreference);
      document.documentElement.classList.toggle("dark", darkModePreference === "dark");
    } else {
      // Por defecto "light" si no hay preferencia guardada
      setDarkMode("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setDarkMode(mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser usado dentro de un ThemeProvider");
  }
  return context;
};
