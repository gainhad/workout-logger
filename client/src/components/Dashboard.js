import React from "react";
import RecentActivity from "./RecentActivity";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDataActions } from "../redux/slices/userData";

const Dashboard = () => {
  const dispatch = useDispatch();
  return (
    <div id="dashboard">
      <button
        type="button"
        id="logout-button"
        onClick={() => dispatch(userDataActions.logOut())}
        className="left-nav"
      >
        Logout
      </button>
      <DashboardMenu />
    </div>
  );
};

const DashboardMenu = () => {
  return (
    <div id="dashboard-menu">
      <Link to="/workout">
        <button type="button" className="button-one">
          Start Workout
        </button>
      </Link>
      <Link to="/measurement">
        <button type="button" className="button-one">
          Log Measurement
        </button>
      </Link>
      <Link to="/view">
        <button type="button" className="button-one">
          View Data
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
