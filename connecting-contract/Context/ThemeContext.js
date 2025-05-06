import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme : 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log(`Toggling theme from ${prevTheme} to ${nextTheme}`); // <-- ADD THIS LOG
      return nextTheme;
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      body.classList.remove('light', 'dark');
      body.classList.add(theme); 
      localStorage.setItem('theme', theme); 
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
