import { useState, useCallback, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch (error) {
      console.error("Failed to get theme from localStorage:", error);
      return "dark";
    }
  })

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
};
