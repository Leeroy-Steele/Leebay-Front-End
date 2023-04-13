// Npx create-react-app capstone_react_frontend //npm install @mui/material @emotion/react @emotion/styled  //npm install @fontsource/roboto 
//npm install @mui/icons-material  //npm install @mui/x-date-pickers  //npm install moment // npm install axios //npm install react-router-dom


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

