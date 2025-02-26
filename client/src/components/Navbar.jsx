import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4 md:px-8 shadow-lg flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-yellow-400"
        >
          E-Learn
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => setOpenLogin(true)}
            className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md shadow-md"
          >
            Login
          </button>
          <button
            onClick={() => setOpenSignup(true)}
            className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md shadow-md"
          >
            Signup
          </button>
        </div>

        {/* Mobile Menu Toggle Button (Smaller Icon) */}
        <button
          className="md:hidden text-yellow-400 text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </nav>

      {/* Mobile Sidebar Menu (Opens from Right Side) */}
      <div
        className={`fixed top-0 right-0 h-full w-48 bg-gray-900 text-white p-5 transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"} md:hidden shadow-lg`}
      >
        <button
          className="absolute top-4 left-4 text-yellow-400 text-xl"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes size={22} />
        </button>

        <ul className="mt-10 space-y-4">
          <li>
            <button
              onClick={() => {
                setOpenLogin(true);
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md shadow-md"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setOpenSignup(true);
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md shadow-md"
            >
              Signup
            </button>
          </li>
        </ul>
      </div>

      {/* Signup & Login Modals (Smaller UI) */}
      {openSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-72">
            <Signup openSignup={openSignup} setOpenSignup={setOpenSignup} />
          </div>
        </div>
      )}

      {openLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-72">
            <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
