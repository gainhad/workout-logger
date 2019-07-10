import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import MeasurementForm from './MeasurementForm';
import './MeasurementMenu.scss';

const MeasurementMenu = () => {
  const [measurementModalOpen, setMeasurementModalOpen] = useState(false);
  const [measurementType, setMeasurementType] = useState('');

  return (
    <>
      <div id="measurement-menu">
        <Link to="/">
          <button type="button" className="arrow-button upper-left">
            &larr;
          </button>
        </Link>
        <div id="measurement-selection">
          <button type="button" className="button-one measurment-button" onClick={()=>{setMeasurementType('WEIGHT'); setMeasurementModalOpen(true);}}>
            LOG WEIGHT
          </button>
          <button type="button" className="button-one measurment-button" onClick={()=>{setMeasurementType('WAIST'); setMeasurementModalOpen(true);}}>
            LOG WAIST
          </button>
        </div>
      </div>
    <Modal isOpen={measurementModalOpen} onClose={()=>setMeasurementModalOpen(false)}>
        <MeasurementForm type={measurementType}/>
      </Modal>
    </>
  );
};

export default MeasurementMenu;
