import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BibleContext } from '../BibleContext.jsx';

const BibleBooks = () => {
  const { books } = useContext(BibleContext);

  // Assume first 39 are Old, rest New (standard NIV)
  const oldTestament = books.slice(0, 39);
  const newTestament = books.slice(39);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">Bible Books (NIV)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primaryBlue">Old Testament</h2>
          <ul className="space-y-2">
            {oldTestament.map((book) => (
              <li key={book}>
                <Link
                  to={`/bible/${book}`}
                  className="block bg-white p-3 rounded-2xl shadow-xl hover:bg-accent hover:text-white transition-all duration-300 border-2 border-secondaryPurple"
                >
                  <h3 className="text-xl font-bold text-funPink hover:text-white">{book}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primaryBlue">New Testament</h2>
          <ul className="space-y-2">
            {newTestament.map((book) => (
              <li key={book}>
                <Link
                  to={`/bible/${book}`}
                  className="block bg-white p-3 rounded-2xl shadow-xl hover:bg-accent hover:text-white transition-all duration-300 border-2 border-secondaryPurple"
                >
                  <h3 className="text-xl font-bold text-funPink hover:text-white">{book}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Cartoon Image */}
     
    </div>
  );
};

export default BibleBooks;