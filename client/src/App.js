import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import PrivateRoute from "./hocs/PrivateRoute";
import LoginPrivate from "./hocs/LoginPrivate";

function App() {
  return (
    <div>
      <Router>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/search">
          <Redirect to="/search" />
        </Route>
        <Route path="/savedbooks">
          <Redirect to="/savedbooks" />
        </Route>   
        <LoginPrivate path="/login" component={Login} />
        <PrivateRoute path="/search" component={Search} />
        <PrivateRoute path="/savedbooks" component={Saved} />
      </Router>
    </div>
  );
}

export default App;
