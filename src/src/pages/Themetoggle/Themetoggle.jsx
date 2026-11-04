import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('light-mode');
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      🌙
    </button>
  );
};

export default ThemeToggle;