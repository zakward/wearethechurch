import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const Footer = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleContinueReading = () => {
    if (user?.bookmarks?.length > 0) {
      const lastBookmark = user.bookmarks[0]; // Assuming first is latest
      navigate(`/bible/${lastBookmark.book}/${lastBookmark.chapter}#verse-${lastBookmark.verse}`);
    } else {
      alert('No bookmarks yet!');
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-blue-900 bg-opacity-95 shadow-lg p-3 md:p-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {user ? (
            <>
              <Link to="/bible" className="text-white hover:underline">Bible Books</Link>
              <Link to="/persons" className="text-white hover:underline">People</Link>
              <Link to="/saved-verses" className="text-white hover:underline">Saved</Link>
              <Link to="/notes" className="text-white hover:underline">Notes</Link>
              <Link to="/bookmarks" className="text-white hover:underline">Bookmarks</Link>
              <Link to="/forum" className="text-white hover:underline">Forum</Link>
              <Link to="/insights" className="text-white hover:underline">Insights</Link>
              <Link to="/map" className="text-white hover:underline">Map</Link>
              <Link to="/help" className="text-white hover:underline">Help</Link>
              <Link to="/about" className="text-white hover:underline">About</Link>
              <button onClick={handleContinueReading} className="text-white hover:underline">Continue</button>
              <button onClick={logout} className="text-white hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">Login</Link>
              <Link to="/signup" className="text-white hover:underline">Signup</Link>
              <Link to="/help" className="text-white hover:underline">Help</Link>
              <Link to="/about" className="text-white hover:underline">About</Link>
            </>
          )}
        </div>
        <p className="text-white text-sm">Created by @ Zak Ward</p>
      </div>
    </footer>
  );
};

export default Footer;