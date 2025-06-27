import { createContext, useContext, useEffect, useState } from "react";

type possibleThemes = "light" | "dark" | "system";

interface ThemeContextType {
  colorTheme: string;
  setColorTheme: (theme: possibleThemes) => void;
}

interface ThemeContextProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useColorThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useColorThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
}

export default function ThemeContextProvider({ children }: ThemeContextProps) {
  const [theme, _setTheme] = useState<possibleThemes>("light");

  const updateTheme = (newTheme: possibleThemes) => {
    localStorage.setItem("theme", newTheme);
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
      document.documentElement.style.setProperty("color-scheme", systemTheme);
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.style.setProperty("color-scheme", newTheme);
    }

    _setTheme(newTheme);
  };

  const isValidTheme = (theme: string): theme is possibleThemes => {
    return ["light", "dark", "system"].includes(theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme && isValidTheme(savedTheme)) {
      updateTheme(savedTheme);
    } else {
      // default (also catch all in case user puts some random thing in local storage)
      updateTheme("dark");
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ colorTheme: theme, setColorTheme: updateTheme }}
    >
      <div data-theme={theme}> {children}</div>
    </ThemeContext.Provider>
  );
}
