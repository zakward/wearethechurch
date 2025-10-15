
import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext, AuthProvider } from './AuthContext.jsx';
import { BibleProvider } from './BibleContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import BibleBooks from './pages/BibleBooks.jsx';
import BibleReader from './pages/BibleReader.jsx';
import Persons from './pages/Persons.jsx';
import PersonDetail from './pages/PersonDetail.jsx';
import Map from './pages/Map.jsx';
import SavedVerses from './pages/SavedVerses.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import Notes from './pages/Notes.jsx';
import Forum from './pages/Forum.jsx'; // New import for Forum page
import Help from './pages/Help.jsx';
import Nav from './components/Nav.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <BibleProvider>
        <ThemeProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-bgLightBlue dark:bg-gray-900">
            <Nav />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/bible" element={<ProtectedRoute><BibleBooks /></ProtectedRoute>} />
                <Route path="/bible/:book/:chapter?" element={<ProtectedRoute><BibleReader /></ProtectedRoute>} />
                <Route path="/persons" element={<ProtectedRoute><Persons /></ProtectedRoute>} />
                <Route path="/persons/:name" element={<ProtectedRoute><PersonDetail /></ProtectedRoute>} />
                <Route path="/saved-verses" element={<ProtectedRoute><SavedVerses /></ProtectedRoute>} />
                <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
                <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
                <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} /> {/* New Forum route */}
                <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
                <Route path="/help" element={<Help />} />
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </BibleProvider>
    </AuthProvider>
  );
}

export default App;
