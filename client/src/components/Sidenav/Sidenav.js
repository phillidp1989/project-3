import React, { useEffect, useContext } from "react";
import M from "materialize-css";
import "./style.css";
import { UserContext } from "../../Context/UserState";

function Sidenav() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const { user, isLoaded } = useContext(UserContext);

  return (
    <React.Fragment>
      <ul className="sidenav purple lighten-4" id="mobile-demo">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
            </div>
            <a href="#user">
              <img className="circle" src={user.avatar} />
            </a>
            <a href="#name">
            <span className="white-text name">{user.displayName}</span>
            </a>            
          </div>
        </li>
        <li>
          <a href="/search">Search</a>
        </li>
        <li>
          <a href="/savedbooks">Saved</a>
        </li>
        <li>
          <a href="/logout">
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Sidenav;
