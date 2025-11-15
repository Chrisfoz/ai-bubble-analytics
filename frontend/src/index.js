import React from 'react';
import ReactDOM from 'react-dom/client';
// Use the compiled Tailwind CSS output instead of the raw source file
// index.css is the Tailwind input, compiled by:
//   npx tailwindcss -i ./src/index.css -o ./src/tw.css --watch
import './tw.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
