import React from "react";
import "./style.css";

function Jumbotron() {
  return (
    <div className="row jumbotron">
      <h3>
        <i className="fab fa-google"></i>
        oogle Book Search <i className="fas fa-book"></i>
      </h3>
      <div className="section">        
        <p className="lead">The home of all your favourite books</p>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default Jumbotron;
