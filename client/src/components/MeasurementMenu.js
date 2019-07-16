import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import MeasurementForm from "./MeasurementForm";
import "./MeasurementMenu.scss";

const MeasurementMenu = () => {
  const [measurementModalOpen, setMeasurementModalOpen] = useState(false);
  const [measurementType, setMeasurementType] = useState("");

  return (
    <>
      <div id="measurement-menu">
        <Link to="/">
          <button type="button" className="arrow-button upper-left">
            &larr;
          </button>
        </Link>
        <div id="measurement-selection">
          <button
            type="button"
            className="button-one measurement-button"
            onClick={() => {
              setMeasurementType("waist");
              setMeasurementModalOpen(true);
            }}
          >
            LOG WAIST
          </button>
          <button
            type="button"
            className="button-one measurement-button"
            onClick={() => {
              setMeasurementType("weight");
              setMeasurementModalOpen(true);
            }}
          >
            LOG WEIGHT
          </button>
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
