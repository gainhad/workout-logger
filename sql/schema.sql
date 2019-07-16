DROP TABLE users CASCADE;
DROP TABLE workouts CASCADE;
DROP TABLE lifts CASCADE;
DROP TABLE sets CASCADE;
DROP TABLE measurements CASCADE;

CREATE TABLE users(
  userId SERIAL PRIMARY KEY,
  googleId CHAR(21)
);

CREATE TABLE workouts(
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId),
  time_completed TIMESTAMP NOT NULL,
  duration SMALLINT NOT NULL,
  session_rpe SMALLINT
);

CREATE TABLE lifts(
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId) NOT NULL,
  workoutID INT REFERENCES workouts(id),
  liftName VARCHAR(40),
  duration INT
);

CREATE TABLE sets(
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId) NOT NULL,
  liftID INT REFERENCES lifts(id) NOT NULL,
  time_completed TIMESTAMP NOT NULL,
  weight SMALLINT NOT NULL,
  reps SMALLINT NOT NULL,
  rpe SMALLINT NOT NULL
);

CREATE TABLE measurements(
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId) NOT NULL,
  time_taken TIMESTAMP NOT NULL,
  measurement_type VARCHAR(40) NOT NULL,
  measurement INT NOT NULL,
  unit VARCHAR(20) NOT NULL
);
