import React from 'react';

import CompletionGenerator from './CompletionGenerator';

const MainController = () => {

    return (
        <div className="main-controller">
          <h2 className="font-size-32px color-black text-center"><b>Your AI-Powered Vacation Planner</b></h2>
          <h3 className="text-center">Discover, Plan, and Experience Your Dream Getaway with Intelligent Assistance</h3>
          <CompletionGenerator />
        </div>
      );

}

export default MainController;