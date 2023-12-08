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
    setCookie("gradient_theme", gradientTheme);
  }, [gradientTheme]);

  useEffect(() => {
    setCookie("bg_theme", bgTheme);
  }, [bgTheme]);

  const toogleColorTheme = () => {
    setColorTheme(colorTheme === "light" ? "dark" : "light");
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
