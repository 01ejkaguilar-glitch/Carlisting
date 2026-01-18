import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 px-6 md:px-12 lg:px-20 xl:px-32 py-5">
      <div className="w-full flex justify-between items-center">
        {/* Brand Logo/Name */}
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          MyBrand
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            Home
          </Link>
          <Link to="/#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            Features
          </Link>
          <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            Contact
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link
            to="/"
            className="block text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/#features"
            className="block text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <a
            href="#about"
            className="block text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="block text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
