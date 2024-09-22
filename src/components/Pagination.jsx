import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  let startPage, endPage;
  if (totalPages <= 7) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 4) {
      startPage = 1;
      endPage = 7;
    } else if (currentPage + 3 >= totalPages) {
      startPage = totalPages - 6;
      endPage = totalPages;
    } else {
      startPage = currentPage - 3;
      endPage = currentPage + 3;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
      >
        <ChevronLeft size={24} />
      </button>
      
      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-2 rounded-md hover:bg-gray-200">1</button>
          {startPage > 2 && <span className="px-3 py-2">...</span>}
        </>
      )}
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-2 rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          {number}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-3 py-2">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="px-3 py-2 rounded-md hover:bg-gray-200">{totalPages}</button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;