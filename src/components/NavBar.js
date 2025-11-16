import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ isShrunk = false, setIsShrunk = () => {} }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    setIsShrunk(true);
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header
      className={`relative w-full text-white bg-gradient-to-br from-[#001F3F] via-[#003366] to-[#008080] shadow-lg transition-all duration-700 ease-in-out ${
        isShrunk ? "py-3 sm:py-4" : "py-6 sm:py-8"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15)_0%,_transparent_60%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between">
        {/* Brand Title */}
        <h1
          onClick={() => handleNavigation("/")}
          className={`cursor-pointer font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-400 transition-all duration-700 ${
            isShrunk
              ? "text-3xl sm:text-4xl"
              : "text-4xl sm:text-5xl hover:scale-105"
          }`}
        >
          MediSetu
        </h1>

        {/* Desktop Navigation */}
        <nav
          className={`hidden sm:flex items-center space-x-8 font-medium transition-all duration-500 ${
            isShrunk ? "text-base" : "text-lg"
          }`}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Register", path: "/register" },
            { name: "Login", path: "/login" },
          ].map((btn) => (
            <button
              key={btn.name}
              onClick={() => handleNavigation(btn.path)}
              className="relative px-4 py-1 transition-all duration-300 rounded-md hover:text-cyan-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(34,211,238,0.6)] focus:outline-none"
            >
              {btn.name}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-4 py-4 bg-[#002b5b] rounded-b-xl shadow-inner">
          {[
            { name: "Home", path: "/" },
            { name: "Register", path: "/register" },
            { name: "Login", path: "/login" },
          ].map((btn) => (
            <button
              key={btn.name}
              onClick={() => handleNavigation(btn.path)}
              className="text-lg font-semibold hover:text-cyan-300 transition-all duration-300 hover:scale-110"
            >
              {btn.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default NavBar;
