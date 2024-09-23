import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Navbar component that receives handleSearch function as a prop
const Navbar = ({ handleSearch }) => {
  // State variables for search input and menu toggle
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  // Handle search input submission
  const handleSearchInput = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigate to the home route
  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo with navigation to home on click */}
        <div className="flex items-center cursor-pointer">
          <h1 className="text-2xl font-bold text-sky-500" onClick={handleNavigate}>Food Facts</h1>
        </div>

        {/* Search form for larger screens */}
        <div className="hidden md:block">
          <form onSubmit={handleSearchInput} className="flex items-center">
            <input
              type="search"
              placeholder="Search Name/Barcode"
              className="px-4 py-2 rounded-l-md border border-gray-300 focus:ring-sky-500 focus:border-sky-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-sky-500 text-white px-4 py-2 rounded-r-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Search
            </button>
          </form>
        </div>

        {/* Hamburger menu button for mobile view */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-sky-500 hover:text-sky-600 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
          >
            <span className="sr-only">Open main menu</span>
            {/* SVG icons for open/close menu */}
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile view search form */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-4 pb-3 border-t border-gray-300">
          <form onSubmit={handleSearchInput} className="mt-3 px-2">
            <input
              type="search"
              placeholder="Search Name/Barcode"
              className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-sky-500 focus:border-sky-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 w-full bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
