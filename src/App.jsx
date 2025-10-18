import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import BibleReader from './pages/BibleReader.jsx';
import BibleBooks from './pages/BibleBooks.jsx';
import Insights from './pages/Insights.jsx';
import Notes from './pages/Notes.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import SavedVerses from './pages/SavedVerses.jsx';
import Forum from './pages/Forum.jsx';
import Religions from './pages/Religions.jsx';
import ReligionDetail from './pages/ReligionDetail.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Help from './pages/Help.jsx';
import Persons from './pages/Persons.jsx';
import PersonDetail from './pages/PersonDetail.jsx'; // Add this import
import About from './pages/About.jsx';
import { BibleProvider } from './BibleContext.jsx';
import { AuthProvider } from './AuthContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import Terminology from './pages/Terminology.jsx';

const App = () => {
  return (
    <AuthProvider>
      <BibleProvider>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Nav />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bible" element={<BibleBooks />} />
                <Route path="/bible/:book" element={<BibleReader />} />
                <Route path="/bible/:book/:chapter" element={<BibleReader />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/saved-verses" element={<SavedVerses />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/persons" element={<Persons />} />
                <Route path="/persons/:name" element={<PersonDetail />} /> {/* Add this route */}
                <Route path="/religions" element={<Religions />} />
                <Route path="/religions/:id" element={<ReligionDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/help" element={<Help />} />
                <Route path="/about" element={<About />} />     
                <Route path="/terminology" element={<Terminology />} />     
                <Route path="*" element={<p className="text-center text-red-500 p-8">Page not found.</p>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </BibleProvider>
    </AuthProvider>
  );
};

export default App;