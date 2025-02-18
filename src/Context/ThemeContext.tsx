"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Tipo para el modo de tema
type ThemeMode = "light" | "dark";

// Propiedades del contexto de tema
interface ThemeContextProps {
  darkMode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}

// Crear contexto de tema
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<ThemeMode>("light");

  // Efecto para cargar el tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const initialTheme = savedTheme || "light";

    setDarkMode(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Actualizar el tema dinámicamente
  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode);
  }, [darkMode]);

  const setTheme = (mode: ThemeMode) => {
    setDarkMode(mode);
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
