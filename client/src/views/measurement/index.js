import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import MeasurementForm from "./MeasurementForm";
import styles from "./measurementMenu.module.scss";
import ButtonOne from "../../components/ButtonOne";

const MeasurementMenu = () => {
  const [measurementModalOpen, setMeasurementModalOpen] = useState(false);
  const [measurementType, setMeasurementType] = useState("");

  return (
    <>
      <div id={styles.measurementMenu}>
        <Link to="/">
          <button type="button" className={styles.backButton}>
            &larr;
          </button>
        </Link>
        <div id={styles.measurementSelection}>
          <ButtonOne
            type="button"
            className={styles.measurementButton}
            onClick={() => {
              setMeasurementType("waist");
              setMeasurementModalOpen(true);
            }}
          >
            Log Waist
          </ButtonOne>
          <ButtonOne
            type="button"
            className={styles.measurementButton}
            onClick={() => {
              setMeasurementType("weight");
              setMeasurementModalOpen(true);
            }}
          >
            Log Weight
          </ButtonOne>
        </div>
      </div>
      <Modal
        isOpen={measurementModalOpen}
        onClose={() => setMeasurementModalOpen(false)}
      >
        <MeasurementForm type={measurementType} />
      </Modal>
    </>
  );
};

export default MeasurementMenu;
