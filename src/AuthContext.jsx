import React, { createContext, useState, useEffect } from 'react';
import api from './api.js'; // The Axios instance
import {
  signup as apiSignup,
  login as apiLogin,
  getProfile,
  saveVerse as apiSaveVerse,
  unsaveVerse as apiUnsaveVerse,
  addBookmark as apiAddBookmark,
  unbookmark as apiUnbookmark,
  addNote as apiAddNote,
  deleteNote as apiDeleteNote,
  resetUnreadNotes as apiResetUnreadNotes,
  resetUnreadSaved as apiResetUnreadSaved,
  resetUnreadBookmarks as apiResetUnreadBookmarks,
  getForumPosts,
  addForumPost as apiAddForumPost,
  addComment as apiAddComment,
  deleteForumPost as apiDeleteForumPost,
  deleteComment as apiDeleteComment,
  highlightVerse as apiHighlightVerse,
} from './api.js';

export const AuthContext = createContext();

const defaultReaderSettings = {
  // Persisted reader preferences
  mode: 'light',          // 'light' | 'dark' | 'sepia' | 'high-contrast'
  fontSize: 'base',       // 'base' | 'lg' | 'xl'
  fontFamily: 'friendly', // 'friendly' | 'serif' | 'sans'
  version: 'NIV',         // Bible translation/version
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW: Reader settings persisted in localStorage
  const [readerSettings, setReaderSettings] = useState(defaultReaderSettings);

  useEffect(() => {
    const loadUser = async () => {
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      // Load persisted reader settings ASAP for instant UX
      const storedSettings = localStorage.getItem('readerSettings');
      if (storedSettings) {
        try {
          const parsed = JSON.parse(storedSettings);
          setReaderSettings(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error('Failed to parse readerSettings from localStorage:', e);
        }
      }

      const token = localStorage.getItem('token');
      if (token) {
        // Load cached user for quick render
        const cachedUser = localStorage.getItem('currentUser');
        if (cachedUser) {
          try {
            setUser(JSON.parse(cachedUser));
          } catch (err) {
            console.error('Failed to parse cached user:', err);
          }
        }
        // Then fetch fresh from API
        try {
          const profile = await getProfile();
          setUser(profile);
          localStorage.setItem('currentUser', JSON.stringify(profile));
        } catch (err) {
          console.error('Failed to load profile from API:', err);
          // If 401, interceptor will handle logout
        }
      }

      setLoading(false);
    };

    // Set up Axios interceptors
    const requestInterceptor = api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => Promise.reject(error));

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.log('401 Unauthorized detected - Logging out...');
          logout();
          // Optionally redirect: window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    loadUser();
    fetchForumPosts();

    // Clean up interceptors on unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Persist readerSettings whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('readerSettings', JSON.stringify(readerSettings));
      } catch (e) {
        console.error('Failed to save readerSettings to localStorage:', e);
      }
    }
  }, [readerSettings]);

  const fetchForumPosts = async () => {
    try {
      const posts = await getForumPosts();
      setForumPosts(posts);
    } catch (err) {
      console.error('Failed to fetch forum posts:', err);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { token } = await apiSignup(name, email, password);
      localStorage.setItem('token', token);
      console.log('Token saved during signup:', token);
      // Fetch full profile after signup
      const profile = await getProfile();
      setUser(profile);
      localStorage.setItem('currentUser', JSON.stringify(profile));
    } catch (err) {
      alert(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      const { token } = await apiLogin(email, password);
      localStorage.setItem('token', token);
      console.log('Token saved during login:', token);
      const profile = await getProfile(); // Fetch full profile
      setUser(profile);
      localStorage.setItem('currentUser', JSON.stringify(profile));
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    // Keep readerSettings in localStorage so preferences persist even when logged out
  };

  const saveVerse = async (verseObj) => {
    if (!user) return;
    try {
      const updatedSaved = await apiSaveVerse(verseObj);
      const updatedUser = {
        ...user,
        savedVerses: updatedSaved,
        unreadSavedCount: (user.unreadSavedCount || 0) + 1,
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error saving verse:', err);
    }
  };

  const unsaveVerse = async (book, chapter, verse) => {
    if (!user) return;
    try {
      const updatedSaved = await apiUnsaveVerse({ book, chapter, verse });
      const updatedUser = { ...user, savedVerses: updatedSaved };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error unsaving verse:', err);
    }
  };

  const addBookmark = async (bookmarkObj) => {
    if (!user) return;
    try {
      const updatedBookmarks = await apiAddBookmark(bookmarkObj);
      const updatedUser = {
        ...user,
        bookmarks: updatedBookmarks,
        unreadBookmarksCount: (user.unreadBookmarksCount || 0) + 1,
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error adding bookmark:', err);
    }
  };

  const unbookmark = async (book, chapter, verse) => {
    if (!user) return;
    try {
      const updatedBookmarks = await apiUnbookmark({ book, chapter, verse });
      const updatedUser = { ...user, bookmarks: updatedBookmarks };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error unbookmarking:', err);
    }
  };

  const highlightVerse = async (book, chapter, verse) => {
    if (!user) return;
    try {
      const updatedHighlighted = await apiHighlightVerse({ book, chapter, verse });
      const updatedUser = { ...user, highlightedVerses: updatedHighlighted };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error highlighting verse:', err);
    }
  };

  const addNote = async (noteObj) => {
    if (!user) return;
    try {
      const updatedNotes = await apiAddNote(noteObj);
      const updatedUser = {
        ...user,
        notes: updatedNotes,
        unreadNotesCount: (user.unreadNotesCount || 0) + 1,
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const deleteNote = async (index) => {
    if (!user) return;
    try {
      const updatedNotes = await apiDeleteNote(index);
      const updatedUser = { ...user, notes: updatedNotes };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const resetUnreadNotes = async () => {
    if (!user || user.unreadNotesCount === 0) return;
    try {
      await apiResetUnreadNotes();
      const updatedUser = { ...user, unreadNotesCount: 0 };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error resetting unread notes:', err);
    }
  };

  const resetUnreadSaved = async () => {
    if (!user || user.unreadSavedCount === 0) return;
    try {
      await apiResetUnreadSaved();
      const updatedUser = { ...user, unreadSavedCount: 0 };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error resetting unread saved:', err);
    }
  };

  const resetUnreadBookmarks = async () => {
    if (!user || user.unreadBookmarksCount === 0) return;
    try {
      await apiResetUnreadBookmarks();
      const updatedUser = { ...user, unreadBookmarksCount: 0 };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error resetting unread bookmarks:', err);
    }
  };

  // Forum
  const addForumPost = async (postObj) => {
    if (!user) return;
    try {
      const newPost = await apiAddForumPost(postObj);
      setForumPosts(prev => [...prev, newPost]);
    } catch (err) {
      console.error('Error adding forum post:', err);
    }
  };

  const addComment = async (postId, commentText) => {
    if (!user) return;
    try {
      const updatedComments = await apiAddComment(postId, commentText);
      setForumPosts(prev => prev.map(p => (p._id === postId ? { ...p, comments: updatedComments } : p)));
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const deleteForumPost = async (postId) => {
    if (!user) return;
    try {
      await apiDeleteForumPost(postId);
      setForumPosts(prev => prev.filter(p => p._id !== postId));
    } catch (err) {
      console.error('Error deleting forum post:', err);
    }
  };

  const deleteComment = async (postId, commentIndex) => {
    if (!user) return;
    try {
      await apiDeleteComment(postId, commentIndex);
      fetchForumPosts(); // Reload to sync
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  // NEW: Helper to update reader settings
  const updateReaderSettings = (partial) => {
    setReaderSettings(prev => ({ ...prev, ...partial }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        // auth
        signup,
        login,
        logout,
        // reader settings
        readerSettings,
        updateReaderSettings,
        // verses
        saveVerse,
        unsaveVerse,
        addBookmark,
        unbookmark,
        highlightVerse,
        addNote,
        deleteNote,
        resetUnreadNotes,
        resetUnreadSaved,
        resetUnreadBookmarks,
        // forum
        forumPosts,
        addForumPost,
        addComment,
        deleteForumPost,
        deleteComment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;