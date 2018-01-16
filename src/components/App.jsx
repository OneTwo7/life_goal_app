import React from 'react';
import { Route } from 'react-router';
import Header from './common/Header';
import GoalPage from './goals/GoalPage';
import TimerPage from './timers/TimerPage';

const App = () => (
  <div className="container">
    <h1>Life Goal App</h1>
    <Header />
    <Route exact path="/" component={GoalPage} />
    <Route path="/timers" component={TimerPage} />
    <hr />
    <footer>
      <p>Ivan Antonov 2017</p>
    </footer>
  </div>
);

export default App;
