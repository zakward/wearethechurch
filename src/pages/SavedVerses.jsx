import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import { BibleContext } from '../BibleContext.jsx';

const SavedVerses = () => {
  const { user, deleteSavedVerse, resetUnreadSaved } = useContext(AuthContext);
  const { books } = useContext(BibleContext);
  const savedVerses = user?.savedVerses || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('added');
  const [filterBook, setFilterBook] = useState('all');

  useEffect(() => {
    resetUnreadSaved();
  }, []);

  // Create book order map
  const bookOrder = books.reduce((acc, book, index) => {
    acc[book] = index + 1;
    return acc;
  }, {});

  // Get unique books from saved verses
  const uniqueBooks = [...new Set(savedVerses.map(v => v.book))].sort((a, b) => bookOrder[a] - bookOrder[b]);

  // Filter and search
  const filteredVerses = savedVerses.filter(verse => {
    if (filterBook !== 'all' && verse.book !== filterBook) return false;
    const reference = `${verse.book} ${verse.chapter}:${verse.verse}`;
    return reference.toLowerCase().includes(searchQuery.toLowerCase()) || verse.text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Sort
  const sortedVerses = [...filteredVerses].sort((a, b) => {
    if (sortOption === 'chronological') {
      return (bookOrder[a.book] || 999) - (bookOrder[b.book] || 999) || a.chapter - b.chapter || a.verse - b.verse;
    } else if (sortOption === 'alphabetical') {
      return a.book.localeCompare(b.book) || a.chapter - b.chapter || a.verse - b.verse;
    }
    // 'added' keeps original order
    return 0;
  });

  const handleShare = (verse) => {
    const shareText = `${verse.book} ${verse.chapter}:${verse.verse} "${verse.text}" (${verse.translation})`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Verse copied to clipboard!');
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">Saved Verses</h1>
      {/* Search and Filter/Sort Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex flex-col w-full sm:w-1/3">
          <label htmlFor="search" className="text-sm font-bold text-primaryBlue mb-2">Search by Reference or Text</label>
          <input
            id="search"
            type="text"
            placeholder="Enter search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple hover:scale-105 transition-all duration-300 shadow-sm"
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/4">
          <label htmlFor="filter" className="text-sm font-bold text-primaryBlue mb-2">Filter by Book</label>
          <select
            id="filter"
            value={filterBook}
            onChange={(e) => setFilterBook(e.target.value)}
            className="w-full p-3 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple hover:scale-105 transition-all duration-300 shadow-sm appearance-none"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="%23374151"><path d="M10 14l-6-6h12l-6 6z"/></svg>')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem'
            }}
          >
            <option value="all">All</option>
            {uniqueBooks.map(book => (
              <option key={book} value={book}>{book}</option>
            ))}
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
            <option value="added">Order Added</option>
            <option value="chronological">Chronological</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      {sortedVerses.length === 0 ? (
        <p className="text-center text-textGray">No saved verses match the criteria.</p>
      ) : (
        <ul className="space-y-4">
          {sortedVerses.map((verse, index) => (
            <li key={index} className="bg-white p-4 rounded-2xl shadow-xl border border-secondaryPurple">
              <Link to={`/bible/${verse.book}/${verse.chapter}#verse-${verse.verse}`} className="text-funPink font-bold hover:underline">
                {verse.book} {verse.chapter}:{verse.verse} ({verse.translation})
              </Link>
              <p className="text-textGray mt-2">{verse.text}</p>
              <div className="mt-2 flex space-x-2">
                <button onClick={() => handleShare(verse)} className="text-blue-500 hover:underline">Share</button>
                <button onClick={() => deleteSavedVerse(savedVerses.findIndex(v => v === verse))} className="text-red-500 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedVerses;