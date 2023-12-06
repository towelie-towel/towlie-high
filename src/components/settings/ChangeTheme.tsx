"use client";
import { useEffect, useState } from "react";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

interface IProps {
  dropdownPos: string;
  onChangeFn: (theme: string) => void;
  currentTheme: string;
  isEnabled: boolean;
}

const ChangeTheme: React.FC<IProps> = ({
  dropdownPos,
  onChangeFn,
  currentTheme,
  isEnabled,
}) => {
  const [selectedTheme, setSelectedTheme] = useState("");

  useEffect(() => {
    setSelectedTheme(currentTheme);
  }, [currentTheme]);

  return (
    <>
      <div className={`dropdown ${dropdownPos}`}>
        <button
          disabled={!isEnabled}
          tabIndex={0}
          className="overflow-hidden rounded-lg text-left outline-base-content"
        >
          <div
            data-theme={selectedTheme}
            className="w-full cursor-pointer bg-base-100 font-sans text-base-content"
          >
            <div className="grid grid-cols-5 grid-rows-3">
              <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                <div className="flex-grow text-sm font-bold">
                  {selectedTheme}
                </div>{" "}
                <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                  <div className="w-2 rounded bg-primary"></div>{" "}
                  <div className="w-2 rounded bg-secondary"></div>{" "}
                  <div className="w-2 rounded bg-accent"></div>{" "}
                  <div className="w-2 rounded bg-neutral"></div>
                </div>
              </div>
            </div>
          </div>
        </button>

        <div className="dropdown-content top-px mt-16 max-h-52 w-52 overflow-y-auto rounded-b-box rounded-t-box bg-base-200 text-base-content shadow-2xl">
          <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
            {themes.map((theme, index) => (
              <button
                key={index}
                className="overflow-hidden rounded-lg text-left outline-base-content"
                onClick={() => {
                  onChangeFn(theme);
                }}
              >
                <div
                  data-theme={theme}
                  className="w-full cursor-pointer bg-base-100 font-sans text-base-content"
                >
                  <div className="grid grid-cols-5 grid-rows-3">
                    <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={selectedTheme !== theme ? "invisible" : ""}
                      >
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                      </svg>{" "}
                      <div className="flex-grow text-sm font-bold">{theme}</div>{" "}
                      <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                        <div className="w-2 rounded bg-primary"></div>{" "}
                        <div className="w-2 rounded bg-secondary"></div>{" "}
                        <div className="w-2 rounded bg-accent"></div>{" "}
                        <div className="w-2 rounded bg-neutral"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeTheme;
