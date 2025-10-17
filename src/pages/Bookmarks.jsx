import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const Bookmarks = () => {
  const { user, deleteBookmark, resetUnreadBookmarks } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.unreadBookmarksCount > 0) {
      resetUnreadBookmarks();
    }

    // Reset unreadBookmarksCount when navigating away
    return () => {
      if (user && user.unreadBookmarksCount > 0) {
        resetUnreadBookmarks();
      }
    };
  }, [user, resetUnreadBookmarks, location.pathname]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-red-500">Please log in to view your bookmarks.</p>
      </div>
    );
  }

  const bookmarks = user.bookmarks || [];

  return (
    <div className="relative container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Arrow */}
<button
        onClick={() => navigate('/')}
        className="absolute top-[0px] left-0 text-primaryBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 text-lg p-2 transition-all duration-300"
        aria-label="Back to Bible Books"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
      </button>

      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">My Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p className="text-center text-textGray">No bookmarks saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((bookmark, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl shadow-xl border border-secondaryPurple hover:shadow-2xl transition-all duration-300">
              <Link
                to={`/bible/${bookmark.book}/${bookmark.chapter}#verse-${bookmark.verse}`}
                className="text-lg font-bold text-funPink hover:underline"
                aria-label={`Read ${bookmark.book} ${bookmark.chapter}:${bookmark.verse}`}
              >
                {bookmark.book} {bookmark.chapter}:{bookmark.verse} ({bookmark.translation})
              </Link>
              <p className="text-textGray mt-2">{bookmark.text}</p>
              <p className="text-textGray text-sm mt-1">
                Added: {new Date(bookmark.timestamp || new Date()).toLocaleString()}
              </p>
              <button
                onClick={() => deleteBookmark(index)}
                className="mt-2 bg-secondaryPink text-white py-1 px-3 rounded-full hover:bg-pink-600 transition-all duration-300"
                aria-label={`Delete bookmark for ${bookmark.book} ${bookmark.chapter}:${bookmark.verse}`}
              >
                Delete Bookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
