"use client";
import { setCookie } from "cookies-next";
import { createContext, useContext, useState, useEffect } from "react";

export interface ThemeContext {
  colorTheme: string;
  lightTheme: string;
  darkTheme: string;
  gradientTheme: string;
  bgTheme: string;
  toogleColorTheme: () => void;
  toogleGradientTheme: () => void;
  setColorTheme: (t: string) => void;
  setLightTheme: (t: string) => void;
  setDarkTheme: (t: string) => void;
  setGradientTheme: (t: string) => void;
  setBgTheme: (t: string) => void;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
  colorThemeProp: string;
  lightThemeProp: string;
  darkThemeProp: string;
  gradientThemeProp: string;
  bgThemeProp: string;
}

export const ThemeProvider: React.FC<IProps> = ({
  children,
  colorThemeProp,
  lightThemeProp,
  darkThemeProp,
  gradientThemeProp,
  bgThemeProp,
}) => {
  const [colorTheme, setColorTheme] = useState(colorThemeProp);
  const [lightTheme, setLightTheme] = useState(lightThemeProp);
  const [darkTheme, setDarkTheme] = useState(darkThemeProp);
  const [gradientTheme, setGradientTheme] = useState(gradientThemeProp);
  const [bgTheme, setBgTheme] = useState(bgThemeProp);

  useEffect(() => {
    setCookie("color_theme", colorTheme);
    document
      .querySelector("html")
      ?.setAttribute(
        "data-theme",
        colorTheme === "light" ? lightTheme : darkTheme,
      );
  }, [colorTheme]);

  useEffect(() => {
    setCookie("light_theme", lightTheme);
    if (colorTheme === "light") {
      document.querySelector("html")?.setAttribute("data-theme", lightTheme);
    }
  }, [lightTheme]);

  useEffect(() => {
    setCookie("dark_theme", darkTheme);
    if (colorTheme === "dark") {
      document.querySelector("html")?.setAttribute("data-theme", darkTheme);
    }
  }, [darkTheme]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (gradientTheme === "true") {
      body?.classList.remove("bg-primary");
      body?.classList.remove("bg-secondary");
      body?.classList.add("bg-gradient-to-br");
      body?.classList.add("from-primary");
      body?.classList.add("to-secondary");
    } else {
      body?.classList.remove("bg-gradient-to-br");
      body?.classList.remove("from-primary");
      body?.classList.remove("to-secondary");
      body?.classList.add("bg-" + bgTheme);
    }
    setCookie("gradient_theme", gradientTheme);
  }, [gradientTheme]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (bgTheme === "primary") {
      body?.classList.replace("bg-secondary", "bg-primary");
    } else {
      body?.classList.replace("bg-primary", "bg-secondary");
    }
    setCookie("bg_theme", bgTheme);
  }, [bgTheme]);

  const toogleColorTheme = () => {
    setColorTheme(colorTheme === "light" ? "dark" : "light");
  };

  const toogleGradientTheme = () => {
    setGradientTheme(gradientTheme === "true" ? "false" : "true");
  };

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        lightTheme,
        darkTheme,
        gradientTheme,
        bgTheme,
        toogleColorTheme,
        toogleGradientTheme,
        setColorTheme,
        setLightTheme,
        setDarkTheme,
        setGradientTheme,
        setBgTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
