import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? 'bg-primaryBlue text-white' : 'hover:bg-blue-700 hover:text-white';

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
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-white drop-shadow-md">We Are The Church 🏠</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/bible" className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/bible')} transition-all duration-300 hover:scale-105`}>Bible Books</Link>
              <Link to="/persons" className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/persons')} transition-all duration-300 hover:scale-105`}>People</Link>
              <div className="relative">
                <Link to="/saved-verses" className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/saved-verses')} transition-all duration-300 hover:scale-105`}>Saved</Link>
                {user?.unreadSavedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {user.unreadSavedCount}
                  </span>
                )}
              </div>
              <Link to="/bookmarks" className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/bookmarks')} transition-all duration-300 hover:scale-105`}>Bookmarks</Link>
              <Link to="/map" className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/map')} transition-all duration-300 hover:scale-105`}>Map</Link>
              <Link to="/help" className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/help')} transition-all duration-300 hover:scale-105`}>Help</Link>
              <button onClick={handleContinueReading} className="py-2 px-3 rounded-full text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105">Continue</button>
              <button onClick={handleLogout} className="py-2 px-3 rounded-full text-sm font-semibold text-white bg-secondaryPink hover:bg-pink-600 transition-all duration-300 hover:scale-105">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/login')} transition-all duration-300 hover:scale-105`}>Login</Link>
              <Link to="/signup" className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/signup')} transition-all duration-300 hover:scale-105`}>Signup</Link>
              <Link to="/help" className={`py-2 px-3 rounded-full text-sm font-semibold text-white bg-blue-800 ${isActive('/help')} transition-all duration-300 hover:scale-105`}>Help</Link>
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
                    Saved Verses {user?.unreadSavedCount > 0 && `(${user.unreadSavedCount})`}
                  </Link>
                  <Link to="/bookmarks" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/bookmarks')}`}>Bookmarks</Link>
                  <Link to="/map" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/map')}`}>Map</Link>
                  <Link to="/help" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/help')}`}>Help</Link>
                  <button onClick={handleContinueReading} className="py-3 px-6 rounded-full text-green-600 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">Continue Reading</button>
                  <button onClick={handleLogout} className="py-3 px-6 rounded-full text-secondaryPink font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/login')}`}>Login</Link>
                  <Link to="/signup" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/signup')}`}>Signup</Link>
                  <Link to="/help" onClick={() => setIsModalOpen(false)} className={`py-3 px-6 rounded-full text-primaryBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive('/help')}`}>Help</Link>
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