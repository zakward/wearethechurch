import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { peopleData } from '../data/BibleTranslations/peopleData.jsx';

const Persons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('alphabetical');
  const [filterOption, setFilterOption] = useState('all');

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
  const sortedPeople = filteredPeople.sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else {
      return a.chronology - b.chronology; // Chronological
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">Significant People in the Bible</h1>
      
      {/* Search and Filter/Sort Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex flex-col w-full sm:w-1/3">
          <label htmlFor="search" className="text-sm font-bold text-primaryBlue mb-2">Search by Name</label>
          <input
            id="search"
            type="text"
            placeholder="Enter name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple hover:scale-105 transition-all duration-300 shadow-sm"
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/4">
          <label htmlFor="filter" className="text-sm font-bold text-primaryBlue mb-2">Filter</label>
          <select
            id="filter"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="w-full p-3 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple hover:scale-105 transition-all duration-300 shadow-sm appearance-none"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="%23374151"><path d="M10 14l-6-6h12l-6 6z"/></svg>')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem'
            }}
          >
            <option value="all">All</option>
            <option value="old">Old Testament</option>
            <option value="new">New Testament</option>
            <option value="apostles">Apostles</option>
          </select>
        </div>
        <div className="flex flex-col w-full sm:w-1/4">
          <label htmlFor="sort" className="text-sm font-bold text-primaryBlue mb-2">Sort By</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-3 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple hover:scale-105 transition-all duration-300 shadow-sm appearance-none"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="%23374151"><path d="M10 14l-6-6h12l-6 6z"/></svg>')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem'
            }}
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="chronological">Chronological</option>
          </select>
        </div>
      </div>

      {/* People List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primaryBlue">Old Testament</h2>
          <ul className="space-y-2">
            {sortedPeople
              .filter(person => peopleData.oldTestament.includes(person))
              .map((person, index) => (
                <li key={index}>
                  <Link
                    to={`/persons/${person.name.toLowerCase()}`}
                    className="block bg-white p-3 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-secondaryPurple"
                  >
                    <h3 className="text-xl font-bold text-funPink">{person.name}</h3>
                    <p className="text-textGray">{person.title}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primaryBlue">New Testament</h2>
          <ul className="space-y-2">
            {sortedPeople
              .filter(person => peopleData.newTestament.includes(person))
              .map((person, index) => (
                <li key={index}>
                  <Link
                    to={`/persons/${person.name.toLowerCase()}`}
                    className="block bg-white p-3 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-secondaryPurple"
                  >
                    <h3 className="text-xl font-bold text-funPink">{person.name}</h3>
                    <p className="text-textGray">{person.title}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>

    
    </div>
  );
};

export default Persons;