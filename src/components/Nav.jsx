import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? 'bg-primaryBlue text-white' : 'hover:bg-blue-700';

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
    <nav className="sticky top-0 bg-gradient-to-r from-gray-900 to-blue-900 bg-opacity-95 shadow-lg z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">We Are The Church 🏠</Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center items-center">
          {user ? (
            <>
              <Link to="/bible" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/bible')}`}>Bible Books</Link>
              <Link to="/persons" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/persons')}`}>People</Link>
              <div className="relative">
                <Link to="/saved-verses" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/saved-verses')}`}>Saved Verses</Link>
                {user.unreadSavedCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {user.unreadSavedCount}
                  </span>
                )}
              </div>
              <Link to="/bookmarks" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/bookmarks')}`}>Bookmarks</Link>
              <Link to="/map" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/map')}`}>Map</Link>
              <button onClick={handleContinueReading} className="py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:rotate-1">Continue Reading</button>
              <button onClick={logout} className="py-2 px-4 md:py-3 md:px-6 rounded-full bg-secondaryPink text-white font-bold shadow-lg hover:bg-pink-600 transition-all duration-300 hover:scale-105 hover:-rotate-1">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/login')}`}>Login</Link>
              <Link to="/signup" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/signup')}`}>Signup</Link>
            </>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsModalOpen(true)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 w-4/5 max-w-md p-6 rounded-3xl shadow-2xl">
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4 text-center text-xl">
              {user ? (
                <>
                  <Link to="/bible" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/bible')}`}>Bible Books</Link>
                  <Link to="/persons" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/persons')}`}>People</Link>
                  <Link to="/saved-verses" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/saved-verses')}`}>
                    Saved Verses {user.unreadSavedCount > 0 && `(${user.unreadSavedCount})`}
                  </Link>
                  <Link to="/bookmarks" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/bookmarks')}`}>Bookmarks</Link>
                  <Link to="/map" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/map')}`}>Map</Link>
                  <button onClick={handleContinueReading} className="py-3 px-6 rounded-full text-green-600 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">Continue Reading</button>
                  <button onClick={handleLogout} className="py-3 px-6 rounded-full text-secondaryPink font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/login')}`}>Login</Link>
                  <Link to="/signup" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/signup')}`}>Signup</Link>
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