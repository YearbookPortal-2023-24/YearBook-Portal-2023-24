import React from "react";

const ThemeSettings = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-20 text-6xl">Select Theme</h1>
      <button
        onClick={toggleTheme}
        className="px-8 py-4 text-3xl cursor-pointer transition duration-300 bg-blue-500 text-white rounded-lg"
        style={{ fontSize: "30px" }}
      >
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
};

export default ThemeSettings;
