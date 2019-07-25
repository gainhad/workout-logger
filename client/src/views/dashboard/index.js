import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDataActions } from "../../redux/slices/userData";
import ButtonOne from "../../components/ButtonOne";

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
        <ButtonOne type="button" className="button-one">
          Start Workout
        </ButtonOne>
      </Link>
      <Link to="/measurement">
        <ButtonOne type="button" className="button-one">
          Log Measurement
        </ButtonOne>
      </Link>
      <Link to="/view">
        <ButtonOne type="button" className="button-one">
          View Data
        </ButtonOne>
      </Link>
    </div>
  );
};

export default Dashboard;
