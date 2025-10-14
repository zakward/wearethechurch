import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import { BibleContext } from '../BibleContext.jsx';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { bibleData, books, bookmarks, addBookmark, completed, markCompleted, goals, addGoal, getOverallProgress } = useContext(BibleContext);

  // Form states for bookmark and goal
  const [bookmarkBook, setBookmarkBook] = useState('');
  const [bookmarkChapter, setBookmarkChapter] = useState('');
  const [bookmarkVerse, setBookmarkVerse] = useState('');
  const [bookmarkNote, setBookmarkNote] = useState('');
  const [goalType, setGoalType] = useState('book');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDueDate, setGoalDueDate] = useState('');

  const handleAddBookmark = (e) => {
    e.preventDefault();
    if (bookmarkBook && bookmarkChapter && bookmarkVerse) {
      addBookmark(bookmarkBook, bookmarkChapter, bookmarkVerse, bookmarkNote);
      setBookmarkBook('');
      setBookmarkChapter('');
      setBookmarkVerse('');
      setBookmarkNote('');
    }
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (goalType && goalTarget && goalDueDate) {
      addGoal(goalType, goalTarget, goalDueDate);
      setGoalType('book');
      setGoalTarget('');
      setGoalDueDate('');
    }
  };

  const progress = getOverallProgress();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center mb-12 bg-primaryBlue p-8 rounded-3xl shadow-xl md:p-12 lg:p-16 border-4 border-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-md">
          Welcome, {user.name}!
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-white/90">
          Dive into your Bible study journey—track progress, jot notes, and explore timeless wisdom.
        </p>
        <Link
          to="/bible"
          className="inline-block bg-primaryYellow text-textGray font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-white"
        >
          Start Studying Now
        </Link>
      </section>

      {/* Featured Verse Section */}
      <section className="text-center mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue">Featured Verse of the Day</h2>
        <blockquote className="text-xl italic text-textGray max-w-2xl mx-auto">
          "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." — John 3:16 (NIV)
        </blockquote>
        <p className="mt-4 text-lg text-secondaryPink">Reflect on this and add your thoughts!</p>
      </section>
      {/* Dashboard Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {/* Quick Links Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white md:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue flex items-center">
            <span className="mr-2 text-3xl">🔗</span> Quick Explore
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link to="/bible" className="bg-primaryBlue text-white p-4 rounded-2xl hover:bg-primaryGreen transition-all duration-300 text-center hover:scale-105">
              Bible Books
            </Link>
            <Link to="/persons" className="bg-primaryYellow text-textGray p-4 rounded-2xl hover:bg-secondaryOrange transition-all duration-300 text-center hover:scale-105">
              Significant People
            </Link>
            <Link to="/map" className="bg-secondaryPink text-white p-4 rounded-2xl hover:bg-secondaryPurple transition-all duration-300 text-center hover:scale-105 sm:col-span-2 md:col-span-1">
              Historical Map
            </Link>
          </div>
        </div>
        {/* Progress Card - Dynamic */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue flex items-center">
            <span className="mr-2 text-3xl">📊</span> Your Progress
          </h2>
          <p className="text-lg mb-4 text-textGray">
            You've completed {progress}% of the Bible. Great job—keep the momentum!
          </p>
          <div className="bg-primaryBlue/20 rounded-full h-4 overflow-hidden">
            <div className="bg-primaryBlue h-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-secondaryPink">Completed books: {Object.keys(completed).length} / {books.length}</p>
        </div>

        {/* Notes Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue flex items-center">
            <span className="mr-2 text-3xl">📝</span> Recent Notes
          </h2>
          <p className="text-lg mb-4 text-textGray">
            Add thoughts, theories, or connections here (integrate backend later).
          </p>
          <ul className="space-y-2 text-sm">
            <li className="bg-bgLightBlue p-2 rounded-2xl">Genesis 1:1 - In the beginning...</li>
            <li className="bg-bgLightBlue p-2 rounded-2xl">Linking Psalms to modern life</li>
          </ul>
          <button className="mt-4 w-full bg-secondaryPink text-white py-2 rounded-full shadow-lg hover:bg-secondaryOrange transition-all duration-300 hover:scale-105">
            Add New Note
          </button>
        </div>

      </section>

      {/* Bookmarks Section */}
      <section className="text-center mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue">Bookmarks</h2>
        <ul className="space-y-2 mb-6 max-w-2xl mx-auto text-left">
          {bookmarks.map((bm, index) => (
            <li key={index} className="bg-white p-4 rounded-2xl shadow-lg">
              {bm.book} {bm.chapter}:{bm.verse} - {bm.note}
            </li>
          ))}
          {bookmarks.length === 0 && <p>No bookmarks yet!</p>}
        </ul>
        <form onSubmit={handleAddBookmark} className="max-w-md mx-auto space-y-4">
          <select value={bookmarkBook} onChange={(e) => setBookmarkBook(e.target.value)} className="w-full p-3 border border-cartoonBorder rounded-2xl" required>
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
          <input type="number" value={bookmarkChapter} onChange={(e) => setBookmarkChapter(e.target.value)} placeholder="Chapter" className="w-full p-3 border border-cartoonBorder rounded-2xl" required />
          <input type="number" value={bookmarkVerse} onChange={(e) => setBookmarkVerse(e.target.value)} placeholder="Verse" className="w-full p-3 border border-cartoonBorder rounded-2xl" required />
          <input type="text" value={bookmarkNote} onChange={(e) => setBookmarkNote(e.target.value)} placeholder="Note (optional)" className="w-full p-3 border border-cartoonBorder rounded-2xl" />
          <button type="submit" className="w-full bg-accent text-white p-3 rounded-full hover:bg-funPink">Add Bookmark</button>
        </form>
      </section>

      {/* Goals Section */}
      <section className="text-center mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue">Goals</h2>
        <ul className="space-y-2 mb-6 max-w-2xl mx-auto text-left">
          {goals.map((goal, index) => (
            <li key={index} className="bg-white p-4 rounded-2xl shadow-lg">
              {goal.type} Goal: {goal.target} by {goal.dueDate} (Progress: {goal.progress}%)
            </li>
          ))}
          {goals.length === 0 && <p>No goals yet!</p>}
        </ul>
        <form onSubmit={handleAddGoal} className="max-w-md mx-auto space-y-4">
          <select value={goalType} onChange={(e) => setGoalType(e.target.value)} className="w-full p-3 border border-cartoonBorder rounded-2xl" required>
            <option value="book">Book</option>
            <option value="chapter">Chapter</option>
            <option value="date">Date</option>
          </select>
          <input type="text" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} placeholder="Target (e.g., Genesis)" className="w-full p-3 border border-cartoonBorder rounded-2xl" required />
          <input type="date" value={goalDueDate} onChange={(e) => setGoalDueDate(e.target.value)} className="w-full p-3 border border-cartoonBorder rounded-2xl" required />
          <button type="submit" className="w-full bg-accent text-white p-3 rounded-full hover:bg-funPink">Add Goal</button>
        </form>
      </section>


    
    </div>
  );
};

export default Home;