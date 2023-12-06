"use client";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";

export const useTheme = () => {
  const [colorTheme, setColorTheme] = useState(getCookie("color_theme"));
  const [lightTheme, setLightTheme] = useState(getCookie("data-light_theme"));
  const [darkTheme, setDarkTheme] = useState(getCookie("data-dark_theme"));
  const [gradientTheme, setGradientTheme] = useState(
    getCookie("gradient_theme"),
  );
  const [bgTheme, setBgTheme] = useState(getCookie("bg_theme"));

  useEffect(() => {
    setCookie("color_theme", colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    setCookie("light_theme", lightTheme);
  }, [lightTheme]);

  useEffect(() => {
    setCookie("dark_theme", darkTheme);
  }, [darkTheme]);

  useEffect(() => {
    setCookie("gradient_theme", gradientTheme);
  }, [gradientTheme]);

  useEffect(() => {
    setCookie("bg_theme", bgTheme);
  }, [bgTheme]);

  const toogleColorTheme = () => {
    if (colorTheme === "light") {
      setColorTheme(darkTheme);
    } else if (colorTheme === "dark") {
      setColorTheme(lightTheme);
    }
  };

  return {
    colorTheme,
    lightTheme,
    darkTheme,
    gradientTheme,
    bgTheme,
    toogleColorTheme,
    setColorTheme,
    setLightTheme,
    setDarkTheme,
    setGradientTheme,
    setBgTheme,
  };
};
