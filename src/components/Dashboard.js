import React from 'react';
import RecentActivity from './RecentActivity';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div id="dashboard">
      <Link to="/login" className="left-nav">Logout</Link>
      <DashboardMenu />
      <RecentActivity />
    </div>
  );
};

const DashboardMenu = () => {
  return (
    <div id="dashboard-menu">
      <button type="button">Start Workout</button>
      <button type="button">Log Measurement</button>
    <button type="button">View Data</button>
  </div>
  );
}

export default Dashboard;
