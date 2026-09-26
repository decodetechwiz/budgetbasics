import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themeStorageKey = "budgetbasics_theme_preference";

export const ThemeProvider = ({ children }) => {
  // Check localStorage first, otherwise fallback to user's OS system theme preference
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(themeStorageKey);
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch {
      // error handling if localStorage is blocked in private browsing mode
      return false;
    }
  });

  // Keep DOM attributes synchronized with Bootstrap dark mode classes
  useEffect(() => {
    try {
      localStorage.setItem(themeStorageKey, darkMode ? "dark" : "light");
    } catch {
      // Ignore storage write errors in restricted sandbox
    }

    const rootElement = document.documentElement;
    if (darkMode) {
      rootElement.setAttribute("data-bs-theme", "dark");
      rootElement.classList.add("dark");
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      rootElement.setAttribute("data-bs-theme", "light");
      rootElement.classList.remove("dark");
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// hook for convenient consumption across child components
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider wrapper");
  }
  return context;
};
