import React, { useState } from "react";
import "./App.css";

import Results from "./components/results/results";

const App = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="pageContainer">
      <div className="pageHeader">Search Users or Properties</div>
      <div className="searchBar__container">
        <input
          className="searchBar__input"
          type="text"
          placeholder="Search a keyword"
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div className="results__container">
        <Results keyword={searchKey} />
      </div>
    </div>
  );
};

export default App;
