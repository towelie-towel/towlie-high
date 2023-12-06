"use client";
import { useState } from "react";
import ThemeSection from "./ThemeSection";
import ProductsSection from "./ProductsSection";

const SettingsOptions = () => {
  const [currentSection, setCurrentSection] = useState("Theme");

  return (
    <div className="static flex items-center justify-around max-md:justify-between">
      <input type="checkbox" id="setting-modal" className="modal-toggle" />
      <label htmlFor="setting-modal" className="modal cursor-pointer">
        <label className="modal-box relative">
          <label
            htmlFor="setting-modal"
            className="btn btn-ghost absolute right-4 top-4 cursor-pointer rounded-full max-[400px]:scale-75 max-[350px]:right-0 max-[335px]:hidden"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </label>
          <div className="flex h-8 flex-wrap items-end">
            <button
              className={`tab-lifted tab ${
                currentSection === "Theme" && "tab-active"
              }`}
              onClick={() => {
                setCurrentSection("Theme");
              }}
            >
              Theme
            </button>
            <button
              className={`tab-lifted tab ${
                currentSection === "Products" && "tab-active"
              }`}
              onClick={() => {
                setCurrentSection("Products");
              }}
            >
              Products
            </button>
            <button
              className={`tab-lifted tab ${
                currentSection === "Orders" && "tab-active"
              }`}
              onClick={() => {
                setCurrentSection("Orders");
              }}
            >
              Orders
            </button>
          </div>
          <div className="flex h-[60vh] w-auto flex-col items-center overflow-y-auto overflow-x-hidden">
            {currentSection === "Theme" && <ThemeSection />}
            {currentSection === "Products" && <ProductsSection />}
          </div>
          <div className="modal-action">
            <label htmlFor="setting-modal" className="btn">
              Cerrar
            </label>
          </div>
        </label>
      </label>
    </div>
  );
};

export default SettingsOptions;
