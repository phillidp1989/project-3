import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import UserContext from './context/UserContext';

ReactDOM.render(
  <UserContext>
    <App />
  </UserContext>,
  document.getElementById('root')
);

