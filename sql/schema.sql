DROP TABLE users CASCADE;
DROP TABLE workouts CASCADE;
DROP TABLE lifts CASCADE;
DROP TABLE sets CASCADE;

CREATE TABLE users(
  username VARCHAR(20) PRIMARY KEY
);

CREATE TABLE workouts(
  id INT PRIMARY KEY,
  username VARCHAR(20) REFERENCES users(username),
  time_completed TIMESTAMP NOT NULL,
  duration SMALLINT NOT NULL
);

CREATE TABLE lifts(
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) REFERENCES users(username) NOT NULL,
  workoutID INT REFERENCES workouts(id),
  liftName VARCHAR(40),
  duration INT
);

CREATE TABLE sets(
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) REFERENCES users(username) NOT NULL,
  liftID INT REFERENCES lifts(id) NOT NULL,
  time_completed TIMESTAMP NOT NULL,
  weight SMALLINT NOT NULL,
  reps SMALLINT NOT NULL,
  rpe SMALLINT NOT NULL
);
