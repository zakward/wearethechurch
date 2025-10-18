import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { terminologyData } from '../data/terminologyData.js'; // Adjust path as needed

const Terminology = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('a_to_z');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 20; // Adjustable
  const navigate = useNavigate();

  // All terms
  const allTerms = terminologyData;

  // Filter terms based on search
  const filteredTerms = allTerms.filter(term =>
    term.term.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort terms
  const sortedTerms = [...filteredTerms].sort((a, b) => {
    if (sortOption === 'a_to_z') {
      return a.term.localeCompare(b.term);
    } else if (sortOption === 'z_to_a') {
      return b.term.localeCompare(a.term);
    } else if (sortOption === 'by_book') {
      // Simple alphabetical sort on references for now
      return a.references.localeCompare(b.references);
    }
    return 0;
  });

  // Pagination
  const totalTerms = sortedTerms.length;
  const totalPages = Math.ceil(totalTerms / itemsPerPage);
  const paginatedTerms = sortedTerms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, sortOption, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToPage = (e) => {
    const page = parseInt(e.target.value, 10);
    if (page >= 1 && page <= totalPages && !isNaN(page)) {
      handlePageChange(page);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={() => navigate('/')}
        className="absolute top-[60px] left-0 text-primaryBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 text-lg p-2 transition-all duration-300"
        aria-label="Back to Home"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
      </button>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#3B82B6]">Biblical/Spiritual Terminology</h1>

      {/* Search and Sort Controls */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-lg sticky top-0 z-10 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-1/3">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search by Term</label>
            <input
              id="search"
              type="text"
              placeholder="Enter term..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Search for a term"
            />
          </div>
          <div className="w-full sm:w-1/4">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Sort terms"
            >
              <option value="a_to_z">A to Z</option>
              <option value="z_to_a">Z to A</option>
              <option value="by_book">By Book (Reference)</option>
            </select>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-4">
          Showing <span className="font-semibold">{totalTerms}</span> terms (Page {currentPage} of {totalPages})
        </p>
      </div>

      {/* Terms List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill().map((_, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : totalTerms === 0 ? (
        <p className="text-center text-gray-600">No terms match the current criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedTerms.map((term, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-gray-200"
              aria-label={`View details for ${term.term}`}
            >
              <h3 className="text-lg font-semibold text-blue-600">{term.term}</h3>
              <p className="text-gray-600 text-sm">{term.definition}</p>
              <p className="text-gray-500 text-xs mt-1">{term.references}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="py-2 px-4 rounded-full bg-blue-600 text-white font-medium disabled:bg-gray-400 hover:bg-blue-700 transition-all duration-200"
            aria-label="Go to previous page"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages)
              .map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`py-1 px-3 rounded-full ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all duration-200`}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </button>
              ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="py-2 px-4 rounded-full bg-blue-600 text-white font-medium disabled:bg-gray-400 hover:bg-blue-700 transition-all duration-200"
            aria-label="Go to next page"
          >
            Next
          </button>
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder="Page"
            onChange={handleJumpToPage}
            className="w-20 p-2 border border-gray-300 rounded-lg text-center"
            aria-label="Jump to specific page"
          />
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 py-2 px-4 rounded-full bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition-all duration-200"
        aria-label="Scroll back to top"
      >
        ↑ Top
      </button>
    </div>
  );
};

export default Terminology;