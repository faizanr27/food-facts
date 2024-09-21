import React, { useState } from "react";

const Navbar = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchInput = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-sky-500">Food Facts</h1>
        </div>
        {/* <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="#" className="text-sky-500 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" className="text-sky-500 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium">Category</a>
            <a href="#" className="text-sky-500 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#" className="text-sky-500 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium">Contact Us</a>
          </div>
        </div> */}
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
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-sky-500 hover:text-sky-600 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
          >
            <span className="sr-only">Open main menu</span>
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
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="text-sky-500 hover:text-sky-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="#" className="text-sky-500 hover:text-sky-600 block px-3 py-2 rounded-md text-base font-medium">Category</a>
          <a href="#" className="text-sky-500 hover:text-sky-600 block px-3 py-2 rounded-md text-base font-medium">About</a>
          <a href="#" className="text-sky-500 hover:text-sky-600 block px-3 py-2 rounded-md text-base font-medium">Contact Us</a>
        </div> */}
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