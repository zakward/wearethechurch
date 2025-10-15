import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(u => ({
      ...u,
      savedVerses: u.savedVerses || [],
      highlightedVerses: u.highlightedVerses || [],
      unreadSavedCount: u.unreadSavedCount || 0
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
        unreadSavedCount: storedUser.unreadSavedCount || 0
      };
      if (JSON.stringify(storedUser) !== JSON.stringify(fixedUser)) {
        localStorage.setItem('currentUser', JSON.stringify(fixedUser));
      }
      setUser(fixedUser);
    }
    setLoading(false);
  }, []);

  const signup = (name, email, password) => {
    if (users.some(u => u.email === email)) {
      alert('Email already exists');
      return;
    }
    const newUser = { name, email, password, savedVerses: [], highlightedVerses: [], unreadSavedCount: 0 }; // Note: In real app, hash password!
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
        unreadSavedCount: foundUser.unreadSavedCount || 0
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

  const resetUnreadSaved = () => {
    if (!user || user.unreadSavedCount === 0) return;
    const updatedUser = { ...user, unreadSavedCount: 0 };
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

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, saveVerse, deleteSavedVerse, highlightVerse, resetUnreadSaved }}>
      {children}
    </AuthContext.Provider>
  );
};