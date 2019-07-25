import React, {useState} from 'react';
import './NewSet.scss';
import NewRestTimer from './NewRestTimer';
import SetForm from './SetForm';

const NewSet = props => {
  const [setEntered, setSetEntered] = useState(false);
  function onSetSubmit() {
    setSetEntered(true);
  }

  if (!setEntered) {
    return (
      <SetForm closeModal={props.closeModal} onSetSubmit={onSetSubmit}/>
    );
  } else {
    return <NewRestTimer closeModal={props.closeModal} />;
  }
};

export default NewSet;
