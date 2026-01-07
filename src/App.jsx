import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailsPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-dark-blue custom-shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex justify-between items-center">
          <Link
            to="/"
            className="text-sm sm:text-2xl font-extrabold tracking-tight"
          >
            Where in the world?
          </Link>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 text-xs sm:text-base font-semibold focus:outline-none"
          >
            {darkMode ? (
              <>
                <Sun size={18} fill="currentColor" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:code" element={<DetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
