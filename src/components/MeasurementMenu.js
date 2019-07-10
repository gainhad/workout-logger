import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import './MeasurementMenu.scss';

const MeasurementMenu = () => {
  const [measurementModalOpen, setMeasurementModalOpen] = useState(true);
  const [measurementType, setMeasurementType] = useState('WEIGHT');

  return (
    <>
    <div id="measurement-menu">
      <Link to="/">
        <button type="button" className="arrow-button upper-left">
          &larr;
        </button>
      </Link>
      <div id="measurement-selection">
        <button type="button" className="button-one measurment-button">
          LOG WEIGHT
        </button>
        <button type="button" className="button-one measurment-button">
          LOG WAIST
        </button>
      </div>
    </div>
    </>
  );
};

export default MeasurementMenu;
