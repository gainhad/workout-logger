import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDataActions } from "../../redux/slices/userData";
import ButtonOne from "../../components/ButtonOne";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  function logout() {
    dispatch(userDataActions.logOut());
  }
  return (
    <div id={styles.dashboard}>
      <button type="button" id={styles.logoutButton} onClick={logout}>
        Logout
      </button>
      <DashboardMenu />
    </div>
  );
};

const DashboardMenu = () => {
  return (
    <div id={styles.dashboardMenu}>
      <Link to="/workout">
        <ButtonOne type="button" className={styles.menuButton}>
          Start Workout
        </ButtonOne>
      </Link>
      <Link to="/measurement">
        <ButtonOne type="button" className={styles.menuButton}>
          Log Measurement
        </ButtonOne>
      </Link>
      <Link to="/view">
        <ButtonOne type="button" className={styles.menuButton}>
          View Data
        </ButtonOne>
      </Link>
    </div>
  );
};

export default Dashboard;
