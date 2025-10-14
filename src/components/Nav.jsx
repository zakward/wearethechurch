import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'bg-primaryBlue text-white' : 'hover:bg-primaryBlue/80';

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-primaryBlue to-secondaryPurple bg-opacity-95 shadow-lg z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <Link to="/" className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">We Are The Church App 🎨</Link>
        {user ? (
          <div className="flex flex-wrap gap-4 items-center">
            <Link to="/bible" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/bible')}`}>Bible Books</Link>
            <Link to="/persons" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/persons')}`}>People</Link>
            <Link to="/map" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/map')}`}>Map</Link>
            <button onClick={logout} className="py-2 px-4 md:py-3 md:px-6 rounded-full bg-secondaryPink text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-rotate-1">Logout</button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/login')}`}>Login</Link>
            <Link to="/signup" className={`py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg text-white font-bold transition-all duration-300 hover:scale-105 hover:rotate-1 ${isActive('/signup')}`}>Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;