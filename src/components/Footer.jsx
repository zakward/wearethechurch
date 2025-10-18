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
      <div className="container flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {user ? (
            <>
              <Link to="/bible" className="text-white hover:underline text-sm md:text-base">
                Bible Books
              </Link>
              <Link to="/saved-verses" className="text-white hover:underline text-sm md:text-base">
                Verses
              </Link>
              <Link to="/notes" className="text-white hover:underline text-sm md:text-base">
                Notes
              </Link>
              <Link to="/bookmarks" className="text-white hover:underline text-sm md:text-base">
                Bookmarks
              </Link>
              <Link to="/persons" className="text-white hover:underline text-sm md:text-base">
                People
              </Link>
              <Link to="/insights" className="text-white hover:underline text-sm md:text-base">
                Insights
              </Link>
              <Link to="/terminology" className="text-white hover:underline text-sm md:text-base">
                Terms
              </Link>
              <Link to="/forum" className="text-white hover:underline text-sm md:text-base">
                Forum
              </Link>
              <Link to="/help" className="text-white hover:underline text-sm md:text-base">
                Help
              </Link>
              <button onClick={handleContinueReading} className="text-white hover:underline text-sm md:text-base">
                Continue
              </button>
              <button onClick={logout} className="text-white hover:underline text-sm md:text-base">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline text-sm md:text-base">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:underline text-sm md:text-base">
                Signup
              </Link>
              <Link to="/help" className="text-white hover:underline text-sm md:text-base">
                Help
              </Link>
            </>
          )}
        </div>
        <p className="text-white text-sm mt-4 md:mt-6">Created by @ Zak Ward</p>
      </div>
    </footer>
  );
};

export default Footer;