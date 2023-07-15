import React, { useEffect } from 'react';

import './App.css';
import './css/MainController.css';
import './css/Itinerary.css';

// Pages 
import MainController from './pages/MainController';

export const App = () => {

  useEffect(() => {
    document.title = 'AdeventureBot: Your AI-Powered Vacation Planner';
  }, []);

  return (
    <div className="app">
      <div id="header">
        <h3 className="color-red"><b>AdventureBot</b></h3>
      </div>
      <div id="app-contents">
        <MainController />
      </div>
    </div>
  );
}

export default App;
