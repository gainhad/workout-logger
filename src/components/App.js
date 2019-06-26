import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Workout from './Workout';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/workout" component={Workout} />
      </Router>
    </div>
  );
}

export default App;
