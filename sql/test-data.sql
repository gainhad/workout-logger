INSERT INTO users(username) VALUES('demoUser');

INSERT INTO workouts(username, time_completed, duration)
VALUES('demoUser', to_timestamp(1562954788), 3600);
INSERT INTO workouts(username, time_completed, duration)
VALUES('demoUser', to_timestamp(1562868388), 3600);
INSERT INTO workouts(username, time_completed, duration)
VALUES('demoUser', to_timestamp(1562781988), 3600);

INSERT INTO lifts (username, workoutID, liftName, duration) VALUES('demoUser', 1, 'squat', 600);
INSERT INTO lifts (username, workoutID, liftName, duration) VALUES('demoUser', 1, 'deadlift', 600);
INSERT INTO lifts (username, workoutID, liftName, duration) VALUES('demoUser', 1, 'bench press', 600);
INSERT INTO lifts (username, workoutID, liftName, duration) VALUES('demoUser', 2, 'squat', 600);
INSERT INTO lifts (username, workoutID, liftName, duration) VALUES('demoUser', 2, 'deadlift', 600);
INSERT INTO lifts (username, workoutID, liftName, duration) VALUES('demoUser', 2, 'bench press', 600);
INSERT INTO lifts (username, workoutID, liftName, duration) VALUES('demoUser', 3, 'squat', 600);
INSERT INTO lifts (username, workoutID, liftName, duration) VALUES('demoUser', 3, 'deadlift', 600);
INSERT INTO lifts (username, workoutID, liftName, duration) VALUES('demoUser', 3, 'bench press', 600);

--- sets for workout 1;
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 1, to_timestamp(1562951728), 125, 5, 6);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 1, to_timestamp(1562951728), 135, 5, 7);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 1, to_timestamp(1562951728), 145, 5, 8);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 2, to_timestamp(1562952628), 125, 5, 6);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 2, to_timestamp(1562952628), 135, 5, 7);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 2, to_timestamp(1562952628), 145, 5, 8);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 3, to_timestamp(1562953528), 125, 5, 6);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 3, to_timestamp(1562953528), 135, 5, 7);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 3, to_timestamp(1562953528), 145, 5, 8);

--- sets for workout 2;
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 4, to_timestamp(1562865328), 125, 5, 6);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 4, to_timestamp(1562865328), 135, 5, 7);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 4, to_timestamp(1562865328), 145, 5, 8);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 5, to_timestamp(1562866228), 125, 5, 6);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 5, to_timestamp(1562866228), 135, 5, 7);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 5, to_timestamp(1562866228), 145, 5, 8);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 6, to_timestamp(1562867128), 125, 5, 6);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 6, to_timestamp(1562867128), 135, 5, 7);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 6, to_timestamp(1562867128), 145, 5, 8);

--- sets for workout 3;
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 7, to_timestamp(1562778928), 125, 5, 6);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 7, to_timestamp(1562778928), 135, 5, 7);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 7, to_timestamp(1562778928), 145, 5, 8);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 8, to_timestamp(1562779828), 125, 5, 6);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 8, to_timestamp(1562779828), 135, 5, 7);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 8, to_timestamp(1562779828), 145, 5, 8);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 9, to_timestamp(1562780728), 125, 5, 6);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 9, to_timestamp(1562780728), 135, 5, 7);
INSERT INTO sets(username, liftID, time_completed, weight, reps, rpe) VALUES('demoUser', 9, to_timestamp(1562780728), 145, 5, 8);


-- Test data for measurement history
INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1563019166), 'weight', 175, 'pounds');
INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1562932766), 'weight', 180, 'pounds');
INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1562846366), 'weight', 161, 'pounds');
INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1562759966), 'weight', 195, 'pounds');
INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1562673566), 'weight', 180, 'pounds');

INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1563019166), 'waist', 35, 'inches');
INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1562932766), 'waist', 38, 'inches');
INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1562846366), 'waist', 34, 'inches');
INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1562759966), 'waist', 37, 'inches');
INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp(1562673566), 'waist', 36, 'inches');
