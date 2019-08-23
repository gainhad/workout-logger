const express = require("express");
const app = express();
const Sentry = require("@sentry/node");
const path = require("path");
const pgp = require("pg-promise")();
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const { userDataRouter, db } = require("./api/userData");
const { cookieSecret } = require("./config");
const { OAuth2Client } = require("google-auth-library");
const { clientId } = require("./config");

Sentry.init({
  dsn: "https://a15edc738d0642adb52d091e005ac6cb@sentry.io/1514072"
});

const PORT = process.env.PORT || 5000;

app.use(Sentry.Handlers.requestHandler());
app.use(bodyParser.json());
app.use(
  cookieSession({
    secret: cookieSecret,
    secure: !!process.env.NODE_ENV === "production"
  })
);
app.set("trust proxy", 1); // trust first proxy

app.use(express.static(path.join(__dirname, "client/build")));

const client = new OAuth2Client(clientId);

async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId
  });
  const payload = ticket.getPayload();
  const userId = payload["sub"];
  return userId;
}

async function verifyRequest(req, res, next) {
  if (!req.headers.authorization) {
    res.json({ status: " request must come with authorization token" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const idToken = await verifyToken(token).catch(error =>
      console.error(error)
    );
    const userId = Number(req.params.userId);
    const idMatch = await db
      .one("SELECT userId FROM users WHERE googleId = $1", idToken)
      .then(data => data.userid);
    if (userId === idMatch) {
      next();
    } else {
      res.json({
        status: "loginId does not match requested id for user data"
      });
      console.log("Id mismatch");
    }
  }
}

app.use("/api/user-data", userDataRouter);

app.get("/api/", (req, res) => {
  res.json({ lift_history: "/api/user-data/:userId/lift-history/:liftName" });
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.get("/api/check-authentication", (req, res) => {
  res.json({
    status: !!req.session.userId,
    demo: req.session.userId < 9999999
  });
});

app.get("/api/logout", (req, res) => {
  req.session = null;
  res.json({ statu: "logged out" });
});

app.get("/api/login", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const idToken =
    token === "1"
      ? await db
          .one("SELECT COUNT (userId) FROM users")
          .then(data => data.count)
          .catch(error => console.error(error))
      : await verifyToken(token).catch(error => console.log(error));
  console.log("id token: ", idToken);
  let userId = await db
    .any("SELECT userId FROM users WHERE googleId = $1", idToken)
    .then(async data => {
      if (data[0]) {
        return data[0].userid;
      } else if (token === "1") {
        return await db
          .one(
            "INSERT INTO users (googleId) VALUES ($1) RETURNING userId",
            idToken
          )
          .then(data => {
            addDemoData(data.userid);
            return data.userid;
          })
          .catch(error => console.error(error));
      }
    })
    .catch(error => console.error(error));
  if (userId) {
    req.session.userId = userId;
  }
  res.json({ isLoggedIn: !!userId });
});

function addDemoData(userId) {
  db.task(async task => {
    // TODO: Make this async by grouping promises into array
    const workoutOneIdPromise = task.one(
      "INSERT INTO workouts(userId, time_completed, duration, session_rpe) VALUES($1, to_timestamp(1562954788), 3600, 8) RETURNING id",
      userId
    );
    const workoutTwoIdPromise = task.one(
      "INSERT INTO workouts(userId, time_completed, duration, session_rpe) VALUES($1, to_timestamp(1562868388), 3600, 9) RETURNING id",
      userId
    );
    const workoutThreeIdPromise = task.one(
      "INSERT INTO workouts(userId, time_completed, duration, session_rpe) VALUES($1, to_timestamp(1562781988), 3600, 10) RETURNING id",
      userId
    );
    const [workoutOneId, workoutTwoId, workoutThreeId] = await Promise.all([
      workoutOneIdPromise,
      workoutTwoIdPromise,
      workoutThreeIdPromise
    ]).then(arr => arr.map(e => e.id));
    const liftOneIdPromise = task.one(
      "INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES($1, $2, 'squat', 600) RETURNING id",
      [userId, workoutOneId]
    );
    const liftTwoIdPromise = task.one(
      "INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES($1, $2, 'deadlift', 600) RETURNING id",
      [userId, workoutTwoId]
    );
    const liftThreeIdPromise = task.one(
      "INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES($1, $2, 'bench press', 600) RETURNING id",
      [userId, workoutThreeId]
    );
    const liftFourIdPromise = task.one(
      "INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES($1, $2, 'squat', 600) RETURNING id",
      [userId, workoutOneId]
    );
    const liftFiveIdPromise = task.one(
      "INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES($1, $2, 'deadlift', 600) RETURNING id",
      [userId, workoutTwoId]
    );
    const liftSixIdPromise = task.one(
      "INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES($1, $2, 'bench press', 600) RETURNING id",
      [userId, workoutThreeId]
    );
    const liftSevenIdPromise = task.one(
      "INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES($1, $2, 'squat', 600) RETURNING id",
      [userId, workoutOneId]
    );
    const liftEightIdPromise = task.one(
      "INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES($1, $2, 'deadlift', 600) RETURNING id",
      [userId, workoutTwoId]
    );
    const liftNineIdPromise = task.one(
      "INSERT INTO lifts (userId, workoutID, liftName, duration) VALUES($1, $2, 'bench press', 600) RETURNING id",
      [userId, workoutThreeId]
    );
    const [
      liftOneId,
      liftTwoId,
      liftThreeId,
      liftFourId,
      liftFiveId,
      liftSixId,
      liftSevenId,
      liftEightId,
      liftNineId
    ] = await Promise.all([
      liftOneIdPromise,
      liftTwoIdPromise,
      liftThreeIdPromise,
      liftFourIdPromise,
      liftFiveIdPromise,
      liftSixIdPromise,
      liftSevenIdPromise,
      liftEightIdPromise,
      liftNineIdPromise
    ]).then(arr => arr.map(e => e.id));
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1562951728), 125, 5, 6)",
      [userId, liftOneId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1562951728), 135, 5, 7)",
      [userId, liftOneId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1562951728), 145, 5, 8)",
      [userId, liftOneId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1562952628), 125, 5, 6)",
      [userId, liftTwoId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1562952628), 135, 5, 7)",
      [userId, liftTwoId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1562952628), 145, 5, 8)",
      [userId, liftTwoId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1562953528), 125, 5, 6)",
      [userId, liftThreeId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1562953528), 135, 5, 7)",
      [userId, liftThreeId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1562953528), 145, 5, 8)",
      [userId, liftThreeId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563059325), 145, 5, 6)",
      [userId, liftFourId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563059325), 155, 5, 7)",
      [userId, liftFourId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563059325), 165, 5, 8)",
      [userId, liftFourId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563059325), 145, 5, 6)",
      [userId, liftFiveId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563059325), 155, 5, 7)",
      [userId, liftFiveId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563059325), 165, 5, 8)",
      [userId, liftFiveId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563059325), 145, 5, 6)",
      [userId, liftSixId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563059325), 155, 5, 7)",
      [userId, liftSixId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563059325), 165, 5, 8)",
      [userId, liftSixId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563145725), 225, 5, 6)",
      [userId, liftSevenId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563145725), 235, 5, 7)",
      [userId, liftSevenId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563145725), 245, 5, 8)",
      [userId, liftSevenId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563145725), 225, 5, 6)",
      [userId, liftEightId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563145725), 235, 5, 7)",
      [userId, liftEightId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563145725), 245, 5, 8)",
      [userId, liftEightId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563145725), 225, 5, 6)",
      [userId, liftNineId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563145725), 235, 5, 7)",
      [userId, liftNineId]
    );
    task.none(
      "INSERT INTO sets(userId, liftID, time_completed, weight, reps, rpe) VALUES($1, $2, to_timestamp(1563145725), 245, 5, 8)",
      [userId, liftNineId]
    );
  });
}

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

if (process.env.NODE_ENV === "production") {
  app.use(Sentry.Handlers.errorHandler());
  app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });
}
