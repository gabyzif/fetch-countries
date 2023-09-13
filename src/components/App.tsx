import React from "react";
import "./App.css";
import CountryCardContainer from "./Country/CountryCardContainer";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Countries Of The World</h1>
      </header>
      <main>
        <h2>Countries</h2>
        <div className="countries">
          <CountryCardContainer />
        </div>
      </main>
    </div>
  );
};

export default App;
