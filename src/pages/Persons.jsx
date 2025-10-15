
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { peopleData } from '../data/BibleTranslations/peopleData.jsx';

const Persons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('alphabetical');
  const [filterOption, setFilterOption] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 20; // Adjustable for UX

  // Combine all people for processing
  const allPeople = [...peopleData.oldTestament, ...peopleData.newTestament];

  // Filter people based on search and filter option
  const filteredPeople = allPeople.filter(person => {
    if (filterOption === 'old') return peopleData.oldTestament.includes(person);
    if (filterOption === 'new') return peopleData.newTestament.includes(person);
    if (filterOption === 'apostles') return person.isApostle;
    return true; // 'all'
  }).filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort people
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else {
      return a.chronology - b.chronology; // Chronological
    }
  });

  // Pagination logic
  const totalPeople = sortedPeople.length;
  const totalPages = Math.ceil(totalPeople / itemsPerPage);
  const paginatedPeople = sortedPeople.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Simulate loading for large dataset
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300); // Simulate async fetch
    return () => clearTimeout(timer);
  }, [searchQuery, sortOption, filterOption, currentPage]);

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
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#3B82B6]">Significant People in the Bible</h1>

      {/* Search and Filter/Sort Controls */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-lg sticky top-0 z-10 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-1/3">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search by Name</label>
            <input
              id="search"
              type="text"
              placeholder="Enter name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Search for a person by name"
            />
          </div>
          <div className="w-full sm:w-1/4">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter</label>
            <select
              id="filter"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Filter people by category"
            >
              <option value="all">All</option>
              <option value="old">Old Testament</option>
              <option value="new">New Testament</option>
              <option value="apostles">Apostles</option>
            </select>
          </div>
          <div className="w-full sm:w-1/4">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Sort people by name or chronology"
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="chronological">Chronological</option>
            </select>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-4">
          Showing <span className="font-semibold">{totalPeople}</span> people (Page {currentPage} of {totalPages})
        </p>
      </div>

      {/* People List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill().map((_, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : totalPeople === 0 ? (
        <p className="text-center text-gray-600">No people match the current criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedPeople.map((person, index) => (
            <Link
              key={index}
              to={`/persons/${person.name.toLowerCase()}`}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-gray-200"
              title={`${person.name}: ${person.title}`}
              aria-label={`View details for ${person.name}`}
            >
              <h3 className="text-lg font-semibold text-blue-600">{person.name}</h3>
              <p className="text-gray-600 text-sm">{person.title}</p>
              <p className="text-gray-500 text-xs mt-1">
                {peopleData.oldTestament.includes(person) ? 'Old Testament' : 'New Testament'}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="py-2 px-4 rounded-lg bg-blue-600 text-white font-medium disabled:bg-gray-400 hover:bg-blue-700 transition-all duration-200"
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
                  className={`py-1 px-3 rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all duration-200`}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </button>
              ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="py-2 px-4 rounded-lg bg-blue-600 text-white font-medium disabled:bg-gray-400 hover:bg-blue-700 transition-all duration-200"
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

export default Persons;
