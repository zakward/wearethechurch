import React, { createContext, useState, useEffect } from 'react';

// Assuming NIV.json structure from the repo: 
// {
//   "Genesis": {
//     "1": {
//       "1": "In the beginning God created the heavens and the earth.",
//       // ... more verses as string keys
//     },
//     // ... more chapters as string keys
//   },
//   // ... more books as keys
// }
import nivBibleData from './data/BibleTranslations/NIV/NIV_bible.json';

import kjvBibleData from './data/BibleTranslations/KJV/KJV_bible.json';

export const BibleContext = createContext();

export const BibleProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [completed, setCompleted] = useState({}); // e.g., { "Genesis": { chapters: [1, 2], versesCompleted: 50 } }
  const [goals, setGoals] = useState([]);
  const [currentTranslation, setCurrentTranslation] = useState('NIV');
  const currentBibleData = currentTranslation === 'NIV' ? nivBibleData : kjvBibleData;
  const books = Object.keys(currentBibleData);
  const totalBooks = books.length;

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const storedCompleted = JSON.parse(localStorage.getItem('completed')) || {};
    const storedGoals = JSON.parse(localStorage.getItem('goals')) || [];
    setBookmarks(storedBookmarks);
    setCompleted(storedCompleted);
    setGoals(storedGoals);
  }, []);

  const addBookmark = (book, chapter, verse, note = '') => {
    const newBookmark = { book, chapter, verse, note };
    const updated = [...bookmarks, newBookmark];
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const markCompleted = (book, chapter) => {
    const updated = { ...completed };
    if (!updated[book]) updated[book] = { chapters: [], versesCompleted: 0 };
    if (!updated[book].chapters.includes(chapter)) {
      updated[book].chapters.push(chapter);
      const bookData = currentBibleData[book];
      if (bookData) {
        const chapterStr = chapter.toString();
        const chapterData = bookData[chapterStr];
        if (chapterData) {
          updated[book].versesCompleted += Object.keys(chapterData).length;
        }
      }
    }
    setCompleted(updated);
    localStorage.setItem('completed', JSON.stringify(updated));
  };

  const addGoal = (type, target, dueDate) => {
    const newGoal = { type, target, dueDate, progress: 0 };
    const updated = [...goals, newGoal];
    setGoals(updated);
    localStorage.setItem('goals', JSON.stringify(updated));
  };

  const getOverallProgress = () => {
    let totalVerses = 0;
    Object.values(currentBibleData).forEach(book => {
      Object.values(book).forEach(chap => {
        totalVerses += Object.keys(chap).length;
      });
    });
    let completedVerses = Object.values(completed).reduce((sum, b) => sum + b.versesCompleted, 0);
    return totalVerses > 0 ? Math.round((completedVerses / totalVerses) * 100) : 0;
  };

  return (
    <BibleContext.Provider value={{ currentBibleData, books, bookmarks, addBookmark, completed, markCompleted, goals, addGoal, getOverallProgress, currentTranslation, setCurrentTranslation }}>
      {children}
    </BibleContext.Provider>
  );
};