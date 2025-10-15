import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [forumPosts, setForumPosts] = useState([]); // Global forum posts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(u => ({
      ...u,
      savedVerses: u.savedVerses || [],
      highlightedVerses: u.highlightedVerses || [],
      bookmarks: u.bookmarks || [],
      notes: u.notes || [],
      unreadSavedCount: u.unreadSavedCount || 0,
      unreadNotesCount: u.unreadNotesCount || 0,
      unreadBookmarksCount: u.unreadBookmarksCount || 0 // Add unread bookmarks count
    }));
    if (JSON.stringify(storedUsers) !== JSON.stringify(updatedUsers)) {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    setUsers(updatedUsers);

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      const fixedUser = {
        ...storedUser,
        savedVerses: storedUser.savedVerses || [],
        highlightedVerses: storedUser.highlightedVerses || [],
        bookmarks: storedUser.bookmarks || [],
        notes: storedUser.notes || [],
        unreadSavedCount: storedUser.unreadSavedCount || 0,
        unreadNotesCount: storedUser.unreadNotesCount || 0,
        unreadBookmarksCount: storedUser.unreadBookmarksCount || 0 // Add unread bookmarks count
      };
      if (JSON.stringify(storedUser) !== JSON.stringify(fixedUser)) {
        localStorage.setItem('currentUser', JSON.stringify(fixedUser));
      }
      setUser(fixedUser);
    }

    // Load forum posts from localStorage (simulating public storage)
    const storedForumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
    setForumPosts(storedForumPosts);

    setLoading(false);
  }, []);

  const signup = (name, email, password) => {
    if (users.some(u => u.email === email)) {
      alert('Email already exists');
      return;
    }
    const newUser = {
      name,
      email,
      password,
      savedVerses: [],
      highlightedVerses: [],
      bookmarks: [],
      notes: [],
      unreadSavedCount: 0,
      unreadNotesCount: 0,
      unreadBookmarksCount: 0 // Initialize unread bookmarks count
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const login = (email, password) => {
    let foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const fixedUser = {
        ...foundUser,
        savedVerses: foundUser.savedVerses || [],
        highlightedVerses: foundUser.highlightedVerses || [],
        bookmarks: foundUser.bookmarks || [],
        notes: foundUser.notes || [],
        unreadSavedCount: foundUser.unreadSavedCount || 0,
        unreadNotesCount: foundUser.unreadNotesCount || 0,
        unreadBookmarksCount: foundUser.unreadBookmarksCount || 0 // Add unread bookmarks count
      };
      setUser(fixedUser);
      localStorage.setItem('currentUser', JSON.stringify(fixedUser));
      if (JSON.stringify(foundUser) !== JSON.stringify(fixedUser)) {
        const updatedUsers = users.map(u => u.email === email ? fixedUser : u);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const saveVerse = (verseObj) => {
    if (!user) return;
    const newSaved = [...(user.savedVerses || []), verseObj];
    const newCount = (user.unreadSavedCount || 0) + 1;
    const updatedUser = { ...user, savedVerses: newSaved, unreadSavedCount: newCount };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteSavedVerse = (index) => {
    if (!user) return;
    const newSaved = [...(user.savedVerses || [])];
    newSaved.splice(index, 1);
    const updatedUser = { ...user, savedVerses: newSaved };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const unsaveVerse = (book, chapter, verse) => {
    if (!user) return;
    const newSaved = (user.savedVerses || []).filter(s => !(s.book === book && s.chapter === chapter && s.verse === verse));
    const updatedUser = { ...user, savedVerses: newSaved };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addBookmark = (bookmarkObj) => {
    if (!user) return;
    const newBookmarks = [bookmarkObj, ...(user.bookmarks || [])];
    const newCount = (user.unreadBookmarksCount || 0) + 1; // Increment unread bookmarks count
    const updatedUser = { ...user, bookmarks: newBookmarks, unreadBookmarksCount: newCount };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteBookmark = (index) => {
    if (!user) return;
    const newBookmarks = [...(user.bookmarks || [])];
    newBookmarks.splice(index, 1);
    const updatedUser = { ...user, bookmarks: newBookmarks };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const unbookmark = (book, chapter, verse) => {
    if (!user) return;
    const newBookmarks = (user.bookmarks || []).filter(b => !(b.book === book && b.chapter === chapter && b.verse === verse));
    const updatedUser = { ...user, bookmarks: newBookmarks };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const highlightVerse = (book, chapter, verse) => {
    if (!user) return;
    const hObj = { book, chapter, verse };
    let newHigh = [...(user.highlightedVerses || [])];
    const index = newHigh.findIndex(h => h.book === book && h.chapter === chapter && h.verse === verse);
    if (index > -1) {
      newHigh.splice(index, 1);
    } else {
      newHigh.push(hObj);
    }
    const updatedUser = { ...user, highlightedVerses: newHigh };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addNote = (noteObj) => {
    if (!user) return;
    const newNotes = [noteObj, ...(user.notes || [])];
    const newCount = (user.unreadNotesCount || 0) + 1;
    const updatedUser = { ...user, notes: newNotes, unreadNotesCount: newCount };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteNote = (index) => {
    if (!user) return;
    const newNotes = [...(user.notes || [])];
    newNotes.splice(index, 1);
    const updatedUser = { ...user, notes: newNotes };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const resetUnreadNotes = () => {
    if (!user || user.unreadNotesCount === 0) return;
    const updatedUser = { ...user, unreadNotesCount: 0 };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const resetUnreadSaved = () => {
    if (!user || user.unreadSavedCount === 0) return;
    const updatedUser = { ...user, unreadSavedCount: 0 };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const resetUnreadBookmarks = () => {
    if (!user || user.unreadBookmarksCount === 0) return;
    const updatedUser = { ...user, unreadBookmarksCount: 0 };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Add forum post functionality
  const addForumPost = (postObj) => {
    if (!user) return;
    const newPost = { ...postObj, userName: user.name, userEmail: user.email, id: Date.now(), comments: [] };
    const updatedPosts = [...forumPosts, newPost];
    setForumPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
  };

  const addComment = (postId, commentText) => {
    if (!user) return;
    const updatedPosts = forumPosts.map(post => {
      if (post.id === postId) {
        const newComment = { userName: user.name, userEmail: user.email, text: commentText, timestamp: new Date().toISOString() };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });
    setForumPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
  };

  const deleteForumPost = (postId) => {
    if (!user) return;
    const updatedPosts = forumPosts.filter(post => post.id !== postId);
    setForumPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
  };

  const deleteComment = (postId, commentIndex) => {
    if (!user) return;
    const updatedPosts = forumPosts.map(post => {
      if (post.id === postId) {
        const newComments = [...post.comments];
        newComments.splice(commentIndex, 1);
        return { ...post, comments: newComments };
      }
      return post;
    });
    setForumPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      logout,
      saveVerse,
      deleteSavedVerse,
      unsaveVerse,
      addBookmark,
      deleteBookmark,
      unbookmark,
      highlightVerse,
      addNote,
      deleteNote,
      resetUnreadNotes,
      resetUnreadSaved,
      resetUnreadBookmarks,
      forumPosts,
      addForumPost,
      addComment,
      deleteForumPost,
      deleteComment
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;