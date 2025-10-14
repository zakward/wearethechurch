// src/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'base');
  const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') || 'friendly');

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('fontFamily', fontFamily);
  }, [mode, fontSize, fontFamily]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, fontSize, setFontSize, fontFamily, setFontFamily }}>
      {children}
    </ThemeContext.Provider>
  );
};