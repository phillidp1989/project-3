import React from 'react';
import AppBar from './components/AppBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts';
import Dashboard from './pages/Dashboard';
import NewPost from './pages/NewPost';
import Login from './pages/Login';
import PrivateRoute from './hocs/PrivateRoute';
import { CssBaseline } from '@material-ui/core';
import GuestRoute from './hocs/GuestRoute';

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <GuestRoute path="/login" component={Login} />
          <Route path="*" component={AppBar} />
        </Switch>
        <Route exact path="/" component={AllPosts} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/posts/new" component={NewPost} />
      </Router>
    </div>
  );
}
