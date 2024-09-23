import React from 'react';

// Component to handle pagination of products
const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    
  const pageNumbers = [];// Array to store page numbers

  // Calculate the total number of pages and add each page number to the array
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex flex-wrap justify-center gap-2">
        {/* Display each page number as a button */}
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;