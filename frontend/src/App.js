import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DailyTimes</h1>
      </header>
      <div className="search-bar">
        <input type="text" placeholder="Search for news..." />
        <button>Search</button>
      </div>
      <div className="news-feed">
        {/* News articles will be rendered here */}
        <p>News feed will be displayed here.</p>
      </div>
    </div>
  );
}

export default App;
