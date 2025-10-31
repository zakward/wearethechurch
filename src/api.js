// Updated src/api.js
// Added deleteNote for full CRUD on notes.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API URL:', BASE_URL); // For debugging
const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const token = getToken();
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || 'API request failed');
    }
    return response.json();
  } catch (err) {
    console.error(`API error for ${endpoint}:`, err);
    throw err;
  }
};

// Auth
export const signup = (name, email, password) => apiRequest('/auth/signup', 'POST', { name, email, password });
export const login = (email, password) => apiRequest('/auth/login', 'POST', { email, password });

// User Profile
export const getProfile = () => apiRequest('/user/profile');

// Saved Verses
export const saveVerse = (verseObj) => apiRequest('/user/save-verse', 'POST', verseObj);
export const unsaveVerse = ({ book, chapter, verse }) => apiRequest('/user/unsave-verse', 'POST', { book, chapter, verse });

// Bookmarks
export const addBookmark = (bookmarkObj) => apiRequest('/user/add-bookmark', 'POST', bookmarkObj);
export const unbookmark = ({ book, chapter, verse }) => apiRequest('/user/unbookmark', 'POST', { book, chapter, verse });

// Notes
export const addNote = (noteObj) => apiRequest('/user/add-note', 'POST', noteObj);
export const deleteNote = (index) => apiRequest('/user/delete-note', 'POST', { index });

// Highlight
export const highlightVerse = ({ book, chapter, verse }) => apiRequest('/user/highlight-verse', 'POST', { book, chapter, verse });

// Completed (from BibleProvider)
export const markCompleted = (book, chapter) => apiRequest('/user/mark-completed', 'POST', { book, chapter }); // Assume added to backend

// Goals
export const addGoal = (type, target, dueDate) => apiRequest('/user/add-goal', 'POST', { type, target, dueDate }); // Assume added

// Reset Unread
export const resetUnreadNotes = () => apiRequest('/user/reset-unread-notes', 'POST');
export const resetUnreadSaved = () => apiRequest('/user/reset-unread-saved', 'POST');
export const resetUnreadBookmarks = () => apiRequest('/user/reset-unread-bookmarks', 'POST');

// Forum
export const getForumPosts = () => apiRequest('/forum');
export const addForumPost = ({ title, content, category }) => apiRequest('/forum', 'POST', { title, content, category });
export const updateForumPost = (postId, { title, content }) => apiRequest(`/forum/${postId}`, 'PUT', { title, content });
export const deleteForumPost = (postId) => apiRequest(`/forum/${postId}`, 'DELETE');
export const addComment = (postId, text) => apiRequest(`/forum/${postId}/comment`, 'POST', { text });
export const updateComment = (postId, commentIndex, text) => apiRequest(`/forum/${postId}/comment/${commentIndex}`, 'PUT', { text });
export const deleteComment = (postId, commentIndex) => apiRequest(`/forum/${postId}/comment/${commentIndex}`, 'DELETE');

// Add more as needed (e.g., getAllUsers: apiRequest('/user/all'))