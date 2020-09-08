import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserState from "./Context/UserState";
import BooksState from "./Context/BooksState";

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <BooksState>
        <App />
      </BooksState>
    </UserState>
  </React.StrictMode>,
  document.getElementById("root")
);
