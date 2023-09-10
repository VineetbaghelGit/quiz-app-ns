import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app-home">
      <div className="bg-home">
        <h1 className="title">Quiz App</h1>
        <Link to="/questions">
          <button className="play-btn">Play</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
