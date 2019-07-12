INSERT INTO users(username) VALUES('demoUser');

INSERT INTO workouts(id, username, time_completed, duration)
VALUES(1, 'demoUser', to_timestamp(1562954788), 3600);
INSERT INTO workouts(id, username, time_completed, duration)
VALUES(2, 'demoUser', to_timestamp(1562868388), 3600);
INSERT INTO workouts(id, username, time_completed, duration)
VALUES(3, 'demoUser', to_timestamp(1562781988), 3600);

INSERT INTO lifts(id, username, workoutID, liftName, duration) VALUES(1, 'demoUser', 1, 'squat', 600);
INSERT INTO lifts(id, username, workoutID, liftName, duration) VALUES(2, 'demoUser', 1, 'deadlift', 600);
INSERT INTO lifts(id, username, workoutID, liftName, duration) VALUES(3, 'demoUser', 1, 'bench press', 600);
INSERT INTO lifts(id, username, workoutID, liftName, duration) VALUES(4, 'demoUser', 2, 'squat', 600);
INSERT INTO lifts(id, username, workoutID, liftName, duration) VALUES(5, 'demoUser', 2, 'deadlift', 600);
INSERT INTO lifts(id, username, workoutID, liftName, duration) VALUES(6, 'demoUser', 2, 'bench press', 600);
INSERT INTO lifts(id, username, workoutID, liftName, duration) VALUES(7, 'demoUser', 3, 'squat', 600);
INSERT INTO lifts(id, username, workoutID, liftName, duration) VALUES(8, 'demoUser', 3, 'deadlift', 600);
INSERT INTO lifts(id, username, workoutID, liftName, duration) VALUES(9, 'demoUser', 3, 'bench press', 600);

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
