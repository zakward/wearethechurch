import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { BibleProvider } from './BibleContext.jsx';
import { AuthProvider } from './AuthContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BibleProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BibleProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);