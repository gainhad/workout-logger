import React from 'react';
import RecentActivity from './RecentActivity';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div id="dashboard">
      <Link to="/login" className="left-nav">
        Logout
      </Link>
      <DashboardMenu />
      <RecentActivity />
    </div>
  );
};

const DashboardMenu = () => {
  return (
    <div id="dashboard-menu">
      <Link to="/workout">
        <button type="button" className="button-one">Start Workout</button>
      </Link>
      <Link to="/measurement">
        <button type="button" className="button-one">Log Measurement</button>
      </Link>
      <button type="button" className="button-one">View Data</button>
    </div>
  );
};

export default Dashboard;
