// src/pages/BibleBooks.jsx (Update to link to reader)
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { BibleContext } from '../BibleContext.jsx';

const BibleBooks = () => {
  const { books } = useContext(BibleContext);

  // Assume first 39 are Old, rest New (standard NIV)
  const oldTestament = books.slice(0, 39);
  const newTestament = books.slice(39);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-secondary text-center">Bible Books (NIV)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primary">Old Testament</h2>
          <ul className="space-y-2">
            {oldTestament.map((book) => (
              <li key={book}>
                <Link to={`/bible/${book}`} className="block bg-white p-3 rounded-cartoon shadow-cartoon hover:bg-accent cursor-pointer dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                  {book}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primary">New Testament</h2>
          <ul className="space-y-2">
            {newTestament.map((book) => (
              <li key={book}>
                <Link to={`/bible/${book}`} className="block bg-white p-3 rounded-cartoon shadow-cartoon hover:bg-accent cursor-pointer dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                  {book}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Cartoon image */}
      <img src="https://placehold.co/600x300/png?text=Cartoon+Bible+Books&font=comic" alt="Bible books cartoon" className="mt-8 rounded-cartoon mx-auto max-w-full sm:max-w-md lg:max-w-lg" />
    </div>
  );
};

export default BibleBooks;