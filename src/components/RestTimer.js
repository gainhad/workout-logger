import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './RestTimer.scss';
import { prettyDisplayTime } from '../utils/displayHelpers';
import { useInterval } from '../utils/customHooks';
import soundFile from '../assets/audio/bell.wav';
import RestTimerDisplay from './RestTimerDisplay';

const RestTimer = props => {
  const timer = useSelector(state => state.currentWorkout.restTimer);
  const updateSecondsRemaining = timer =>
    timer.duration - (Date.now() - timer.timeStarted) / 1000;
  const [secondsRemaining, setSecondsRemaining] = useState(
    updateSecondsRemaining(timer)
  );
  const [notificationSoundPlayed, setNotificationSoundPlayed] = useState(false);

  // Update timer every second.
  useInterval(() => {
    setSecondsRemaining(updateSecondsRemaining(timer));
  }, 1000);

  // Play sound when rest finishes.
  useEffect(() => {
    if (secondsRemaining <= 0 && !notificationSoundPlayed) {
      const sound = new Audio();
      sound.src = soundFile;
      sound.play();
      setNotificationSoundPlayed(true);
    } else if (secondsRemaining > 0 && notificationSoundPlayed) {
      setNotificationSoundPlayed(false);
    }
  }, [secondsRemaining]);

  // Render based on seconds remaining.
  if (secondsRemaining > 0) {
    return <RestTimerDisplay />;
  } else if (secondsRemaining <= 0) {
    return (
      <div className="rest-timer" id="rest-finished">
        <b>REST FINISHED!</b>
      </div>
    );
  } else {
    return null;
  }
};

export default RestTimer;
