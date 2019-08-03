import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDataActions } from "../../redux/slices/userData";
import ButtonOne from "../../components/ButtonOne";
import styles from "./dashboard.module.scss";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);
  function logout() {
    setLoggingOut(true);
    setTimeout(() => dispatch(userDataActions.logOut()), 200);
  }
  return (
    <div id={styles.dashboard}>
      <button
        type="button"
        id={styles.logoutButton}
        className={loggingOut ? styles.loggingOut : ""}
        onClick={logout}
      >
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
