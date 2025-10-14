import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { BibleProvider } from './BibleContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BibleProvider>

        <App />
      </BibleProvider>

    </BrowserRouter>
  </React.StrictMode>,
);