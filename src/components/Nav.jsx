import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path) => (location.pathname === path ? 'bg-primaryBlue text-white' : 'hover:bg-blue-700 hover:text-white');

  const handleContinueReading = () => {
    if (user?.bookmarks?.length > 0) {
      const lastBookmark = user.bookmarks[0]; // Assuming first is latest
      navigate(`/bible/${lastBookmark.book}/${lastBookmark.chapter}#verse-${lastBookmark.verse}`);
    } else {
      alert('No bookmarks yet!');
    }
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsModalOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-gray-900 to-blue-900 bg-opacity-95 shadow-lg z-50 p-3 md:p-4">
      <div className="max-w-7xl mx-auto flex flex-col items-start">
        {/* Logo */}
        <div className="flex justify-between w-full">
          <Link to="/" className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
            We Are The Church 🏠
          </Link>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsModalOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isModalOpen}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation - Subnavbar */}
        <div className="hidden md:flex items-center gap-2 mt-2">
          {user ? (
            <>
              <Link
                to="/bible"
                className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/bible')} transition-all duration-300 hover:scale-105`}
                aria-label="Bible Books"
              >
                Bible Books
              </Link>
              <div className="relative">
                <Link
                  to="/saved-verses"
                  className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/saved-verses')} transition-all duration-300 hover:scale-105`}
                  aria-label="Saved Verses"
                >
                 Verses
                </Link>
                {user?.unreadSavedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {user.unreadSavedCount}
                  </span>
                )}
              </div>
              <div className="relative">
                <Link
                  to="/notes"
                  className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/notes')} transition-all duration-300 hover:scale-105`}
                  aria-label="Notes"
                >
                  Notes
                </Link>
                {user?.unreadNotesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {user.unreadNotesCount}
                  </span>
                )}
              </div>
              <div className="relative">
                <Link
                  to="/bookmarks"
                  className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/bookmarks')} transition-all duration-300 hover:scale-105`}
                  aria-label="Bookmarks"
                >
                  Bookmarks
                </Link>
                {user?.unreadBookmarksCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {user.unreadBookmarksCount}
                  </span>
                )}
              </div>
              <Link
                to="/persons"
                className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/persons')} transition-all duration-300 hover:scale-105`}
                aria-label="People"
              >
                People
              </Link>
              <Link
                to="/insights"
                className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/insights')} transition-all duration-300 hover:scale-105`}
                aria-label="Insights"
              >
                Insights
              </Link>
              <Link
                to="/terminology"
                className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/terminology')} transition-all duration-300 hover:scale-105`}
                aria-label="Terms"
              >
                Terms
              </Link>
              <Link
                to="/forum"
                className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/forum')} transition-all duration-300 hover:scale-105`}
                aria-label="Forum"
              >
                Forum
              </Link>
              <Link
                to="/help"
                className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/help')} transition-all duration-300 hover:scale-105`}
                aria-label="Help"
              >
                Help
              </Link>
              <button
                onClick={handleContinueReading}
                className="py-2 px-3 rounded-full text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105"
                aria-label="Continue Reading"
              >
                Continue
              </button>
              <button
                onClick={handleLogout}
                className="py-2 px-3 rounded-full text-sm font-semibold text-white bg-secondaryPink hover:bg-pink-600 transition-all duration-300 hover:scale-105"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/login')} transition-all duration-300 hover:scale-105`}
                aria-label="Login"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/signup')} transition-all duration-300 hover:scale-105`}
                aria-label="Signup"
              >
                Signup
              </Link>
              <Link
                to="/help"
                className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/help')} transition-all duration-300 hover:scale-105`}
                aria-label="Help"
              >
                Help
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 w-11/12 max-w-md max-h-[80vh] p-4 shadow-2xl overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                aria-label="Close navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-2 text-center text-lg">
              {user ? (
                <>
                  <Link
                    to="/bible"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/bible')}`}
                    aria-label="Bible Books"
                  >
                    Bible Books
                  </Link>
                  <Link
                    to="/saved-verses"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/saved-verses')}`}
                    aria-label="Saved Verses"
                  >
                    Verses {user?.unreadSavedCount > 0 && `(${user.unreadSavedCount})`}
                  </Link>
                  <Link
                    to="/notes"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/notes')}`}
                    aria-label="Notes"
                  >
                    Notes {user?.unreadNotesCount > 0 && `(${user.unreadNotesCount})`}
                  </Link>
                  <Link
                    to="/bookmarks"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/bookmarks')}`}
                    aria-label="Bookmarks"
                  >
                    Bookmarks {user?.unreadBookmarksCount > 0 && `(${user.unreadBookmarksCount})`}
                  </Link>
                  <Link
                    to="/persons"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/persons')}`}
                    aria-label="People"
                  >
                    People
                  </Link>
                  <Link
                    to="/insights"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/insights')}`}
                    aria-label="Insights"
                  >
                    Insights
                  </Link>
                  <Link
                    to="/terminology"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/terminology')}`}
                    aria-label="Terms"
                  >
                    Terms
                  </Link>
                  <Link
                    to="/forum"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/forum')}`}
                    aria-label="Forum"
                  >
                    Forum
                  </Link>
                  <Link
                    to="/help"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/help')}`}
                    aria-label="Help"
                  >
                    Help
                  </Link>
                  <button
                    onClick={handleContinueReading}
                    className="py-2 px-4 text-green-600 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    aria-label="Continue Reading"
                  >
                    Continue Reading
                  </button>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 text-secondaryPink font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/login')}`}
                    aria-label="Login"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/signup')}`}
                    aria-label="Signup"
                  >
                    Signup
                  </Link>
                  <Link
                    to="/help"
                    onClick={() => setIsModalOpen(false)}
                    className={`py-2 px-4 text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/help')}`}
                    aria-label="Help"
                  >
                    Help
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;