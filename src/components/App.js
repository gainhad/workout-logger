import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
