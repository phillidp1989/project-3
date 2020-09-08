import React from 'react';
import './style.css';
import { Link } from '@material-ui/core';

function Navbar() {
    return (
        <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper grey darken-3">
        <a href="/search" className="brand-logo">
          <span className="g">G</span>
          <span className="o">o</span>
          <span className="oo">o</span>
          <span className="g">g</span>
          <span className="l">l</span>
          <span className="e">e</span> Book Search</a>          
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"
            ><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a href="/search">Search</a></li>
            <li><a href="/savedbooks">Saved</a></li>
            <li><a href="/logout"><i className="fas fa-sign-out-alt"></i></a></li>              
            
          </ul>
        </div>
      </nav>
    </div>
    )
}

export default Navbar;
