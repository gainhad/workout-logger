INSERT INTO users(googleId) VALUES(100755012838087849582);

INSERT INTO workouts(userId, time_completed, duration, session_rpe)
VALUES(1, to_timestamp(1562954788), 3600, 8);
INSERT INTO workouts(userId, time_completed, duration, session_rpe)
VALUES(1, to_timestamp(1562868388), 3600, 9);
INSERT INTO workouts(userId, time_completed, duration, session_rpe)
VALUES(1, to_timestamp(1562781988), 3600, 10);

INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES(1, 1, 'squat', 600);
INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES(1, 1, 'deadlift', 600);
INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES(1, 1, 'bench press', 600);
INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES(1, 2, 'squat', 600);
INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES(1, 2, 'deadlift', 600);
INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES(1, 2, 'bench press', 600);
INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES(1, 3, 'squat', 600);
INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES(1, 3, 'deadlift', 600);
INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES(1, 3, 'bench press', 600);

--- sets for workout 1;
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 1, to_timestamp(1562951728), 125, 5, 6);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 1, to_timestamp(1562951728), 135, 5, 7);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 1, to_timestamp(1562951728), 145, 5, 8);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 2, to_timestamp(1562952628), 125, 5, 6);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 2, to_timestamp(1562952628), 135, 5, 7);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 2, to_timestamp(1562952628), 145, 5, 8);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 3, to_timestamp(1562953528), 125, 5, 6);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 3, to_timestamp(1562953528), 135, 5, 7);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 3, to_timestamp(1562953528), 145, 5, 8);

--- sets for workout 2;
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 4, to_timestamp(1563059325), 125, 5, 6);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 4, to_timestamp(1563059325), 135, 5, 7);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 4, to_timestamp(1563059325), 145, 5, 8);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 5, to_timestamp(1563059325), 125, 5, 6);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 5, to_timestamp(1563059325), 135, 5, 7);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 5, to_timestamp(1563059325), 145, 5, 8);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 6, to_timestamp(1563059325), 125, 5, 6);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 6, to_timestamp(1563059325), 135, 5, 7);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 6, to_timestamp(1563059325), 145, 5, 8);

--- sets for workout 3;
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 7, to_timestamp(1563145725), 125, 5, 6);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 7, to_timestamp(1563145725), 135, 5, 7);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 7, to_timestamp(1563145725), 145, 5, 8);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 8, to_timestamp(1563145725), 125, 5, 6);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 8, to_timestamp(1563145725), 135, 5, 7);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 8, to_timestamp(1563145725), 145, 5, 8);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 9, to_timestamp(1563145725), 125, 5, 6);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 9, to_timestamp(1563145725), 135, 5, 7);
INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES(1, 9, to_timestamp(1563145725), 145, 5, 8);


-- Test data for measurement history
INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1563019166), 'weight', 175, 'pounds');
INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1562932766), 'weight', 180, 'pounds');
INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1562846366), 'weight', 161, 'pounds');
INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1562759966), 'weight', 195, 'pounds');
INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1562673566), 'weight', 180, 'pounds');

INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1563019166), 'waist', 35, 'inches');
INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1562932766), 'waist', 38, 'inches');
INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1562846366), 'waist', 34, 'inches');
INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1562759966), 'waist', 37, 'inches');
INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, to_timestamp(1562673566), 'waist', 36, 'inches');
