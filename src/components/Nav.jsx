import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'bg-primaryBlue text-white' : 'hover:bg-blue-700';

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-gray-900 to-blue-900 bg-opacity-95 shadow-lg z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center flex-wrap gap-4">
        <Link to="/" className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">We Are The Church 🏠</Link>
        {user ? (
          <div className="flex flex-wrap gap-4 justify-center items-center">
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
            <Link to="/map" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/map')}`}>Map</Link>
            <button onClick={logout} className="py-2 px-4 md:py-3 md:px-6 rounded-full bg-secondaryPink text-white font-bold shadow-lg hover:bg-pink-600 transition-all duration-300 hover:scale-105 hover:-rotate-1">Logout</button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/login')}`}>Login</Link>
            <Link to="/signup" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold bg-blue-800 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/signup')}`}>Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;