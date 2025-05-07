---
sidebar_label: 'ThemeContext'
title: 'ThemeContext, ThemeProvider & ThemeToggle Button'
---

The `ThemeContext` is responsible for managing and providing theme-related functionality (like switching between light and dark modes) across the Artify NFT Marketplace application.

## Purpose

This context allows any component in the application to:
1.  Access the current theme (e.g., 'light' or 'dark').
2.  Access a function to toggle the theme.
3.  It also handles persisting the user's theme preference in `localStorage` and applying the appropriate CSS class to the `<body>` element to activate theme-specific styles.

## File Structure

The context is typically defined in a file like `Context/ThemeContext.js`.

```javascript title="Context/ThemeContext.js"
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
```

The `ThemeToggleButton` is a simple UI component that allows users to switch between the light and dark themes of the application.

## Purpose

* Provides a visual button for theme switching.
* Displays an icon (e.g., sun for dark mode, moon for light mode) to indicate the current theme or the theme it will switch to.
* Uses the `ThemeContext` to access the current theme and the function to toggle it.

## File Structure

The component is typically defined in a file like `components/ThemeToggleButton/ThemeToggleButton.jsx`.

```javascript title="components/ThemeToggleButton/ThemeToggleButton.jsx"
import React from 'react';
import { useTheme } from '../../Context/ThemeContext'; // Adjust path as needed
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState } from 'react'; // For hover effect

// Inline styles for the button (can be moved to a CSS module)
const styles = {
  toggleButton: {
    background: 'var(--icons-bg-color)',
    color: 'var(--icons-color)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: 'var(--box-shadow)',
    transition: 'all 0.3s ease-in-out',
    fontSize: '1.2rem',
  },
  toggleButtonHover: {
     boxShadow: 'var(--box-shadow-inset)', // Uses inset shadow on hover
  }
};

const ThemeToggleButton = () => {
  // Consume theme context
  const { theme, toggleTheme } = useTheme();
  // Local state for hover effect
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={toggleTheme} // Call toggleTheme function from context on click
      style={{
        ...styles.toggleButton,
        ...(isHovered ? styles.toggleButtonHover : {}) // Apply hover style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} // Accessibility label
    >
      {/* Display Moon icon if current theme is light, Sun icon if dark */}
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggleButton;
```