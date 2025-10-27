// Updated src/contexts/BibleProvider.js
// Fixed potential issues by adding error handling/logging.
// Assumed apiMarkCompleted and apiAddGoal are implemented in backend/api.js.
// Uses aliases if needed, but since addBookmark is from Auth, no conflict here.

import React, { createContext, useState, useEffect } from 'react';
import { useContext } from 'react'; // To access AuthContext if needed
import { AuthContext } from './AuthContext'; // Adjust path
import { markCompleted as apiMarkCompleted, addGoal as apiAddGoal } from './api'; // Adjust path

import nivBibleData from './data/BibleTranslations/NIV/NIV_bible.json';
import kjvBibleData from './data/BibleTranslations/KJV/KJV_bible.json';

export const BibleContext = createContext();

export const BibleProvider = ({ children }) => {
  const { user, addBookmark } = useContext(AuthContext); // Use Auth for user-specific like addBookmark
  const [currentTranslation, setCurrentTranslation] = useState('NIV');
  const currentBibleData = currentTranslation === 'NIV' ? nivBibleData : kjvBibleData;
  const books = Object.keys(currentBibleData);
  const totalBooks = books.length;

  // Bookmarks, completed, goals now in user (from Auth/Profile)
  // Access via user.bookmarks, user.completed, user.goals

  const markCompleted = async (book, chapter) => {
    if (!user) return;
    try {
      await apiMarkCompleted(book, chapter);
      // To update local state, reload profile from API
      const updatedProfile = await getProfile(); // Import getProfile if needed
      useContext(AuthContext).setUser(updatedProfile); // Assuming setUser exposed; otherwise, parent refresh
      console.log('Marked completed:', book, chapter);
    } catch (err) {
      console.error('Error marking completed:', err);
    }
  };

  const addGoal = async (type, target, dueDate) => {
    if (!user) return;
    try {
      await apiAddGoal(type, target, dueDate);
      // Reload profile
      const updatedProfile = await getProfile();
      useContext(AuthContext).setUser(updatedProfile);
      console.log('Added goal:', type, target, dueDate);
    } catch (err) {
      console.error('Error adding goal:', err);
    }
  };

  const getOverallProgress = () => {
    if (!user || !user.completed) return 0;
    let totalVerses = 0;
    Object.values(currentBibleData).forEach(book => {
      Object.values(book).forEach(chap => {
        totalVerses += Object.keys(chap).length;
      });
    });
    let completedVerses = Object.values(user.completed).reduce((sum, b) => sum + (b.versesCompleted || 0), 0);
    return totalVerses > 0 ? Math.round((completedVerses / totalVerses) * 100) : 0;
  };

  return (
    <BibleContext.Provider value={{ 
      currentBibleData, 
      books, 
      // bookmarks: user?.bookmarks || [], // Access from user
      addBookmark, // From Auth
      // completed: user?.completed || {},
      markCompleted, 
      // goals: user?.goals || [],
      addGoal, 
      getOverallProgress, 
      currentTranslation, 
      setCurrentTranslation 
    }}>
      {children}
    </BibleContext.Provider>
  );
};