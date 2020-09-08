import React from "react";
import './style.css'

function LoginContainer({ children }) {
  
  return (
    <div>
      <div className="container login-container">
        <div className="card">
          <div className="card-content">
            <h3>
          <span className="g">G</span>
          <span className="o">o</span>
          <span className="oo">o</span>
          <span className="g">g</span>
          <span className="l">l</span>
          <span className="e">e</span> Book Search
            </h3>
            <div className="section">
              <p className="lead">The home of all your favourite books</p>
            </div>
            <div className="divider"></div>
            <div className="section">{children}</div>            
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
