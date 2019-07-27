const express = require("express");
const pgp = require("pg-promise")();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const db = pgp({
  //host: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`j
  //host: `127.0.0.1:5432/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  host: "127.0.0.1",
  //database: process.env.DB_NAME,
  database: "workout_logger",
  //user: process.env.DB_USER,
  user: "hadley",
  password: process.env.DB_PASS
});

const router = express.Router();

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

router.route("/").get(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const idToken = await verifyToken(token).catch(error => console.log(error));
  let userId = await db
    .any("SELECT userId FROM users WHERE googleId = $1", idToken)
    .then(async data => {
      if (data[0]) {
        return data[0].userid;
      } else {
        return await db
          .one(
            "INSERT INTO users (googleId) VALUES ($1) RETURNING userId",
            idToken
          )
          .then(data => data.userid)
          .catch(error => console.error(error));
      }
    })
    .catch(error => console.error(error));
  req.session.userId = userId;
  res.json({ userId: userId });
});

router
  .route("/:userId/lift-history/:liftName")
  .get(verifyRequest, (req, res) => {
    db.task(async task => {
      let lifts = await task.any(
        "SELECT id FROM lifts WHERE userId = $1 AND liftName = $2",
        [req.params.userId, req.params.liftName]
      );
      let sets = await Promise.all(
        lifts.map(lift => {
          return task.any(
            "SELECT id, weight, reps, rpe, time_completed FROM sets WHERE liftId = $1",
            lift.id
          );
        })
      );
      return { lifts, sets };
    }).then(data => {
      res.json(
        data.lifts.map((lift, index) => ({
          ...lift,
          sets: data.sets[index]
        }))
      );
    });
  });

router.route("/lift-history").get((req, res) => {
  console.log(req.session);
  db.task(async task => {
    try {
      let lifts = await task
        .any(
          "SELECT id, liftName FROM lifts WHERE userId = $1",
          req.session.userId
        )
        .catch(error => console.error("lift-history: 112", error));
      let sets = await Promise.all(
        lifts.map(lift => {
          return task.any(
            "SELECT id, weight, reps, rpe, time_completed FROM sets WHERE liftId = $1",
            lift.id
          );
        })
      );
      sets.forEach(setGroup =>
        setGroup.forEach(
          set => (set.time_completed = new Date(set.time_completed).getTime())
        )
      );
      return { lifts, sets };
    } catch (error) {
      console.error(error);
    }
  }).then(data => {
    let returnData = {};
    data.lifts = data.lifts.map((lift, index) => ({
      ...lift,
      sets: data.sets[index]
    }));
    data.lifts.map((lift, index) => {
      let name = lift.liftname;
      delete lift.liftname;
      if (returnData.hasOwnProperty(name)) {
        returnData[name]["byId"] = {
          ...returnData[name]["byId"],
          [lift.id]: { ...lift }
        };
        returnData[name]["allIds"].push(lift.id);
      } else {
        returnData[name] = {
          byId: { [lift.id]: { ...lift } },
          allIds: [lift.id]
        };
      }
    });
    res.json(returnData);
  });
});

router.route("/workout-history").post(async (req, res) => {
  const lifts = req.body.lifts;
  const lastLift = lifts[lifts.length - 1];
  const timestamp = lastLift.sets[lastLift.sets.length - 1].timestamp / 1000;
  const { id: workoutId } = await db
    .one(
      "INSERT INTO workouts (userId, time_completed, duration) VALUES ($1, to_timestamp($2), $3) RETURNING id",
      [req.session.userId, timestamp, req.body.duration]
    )
    .catch(e => console.error(e));
  let liftIds = await Promise.all(
    lifts.map(lift =>
      db.one(
        "INSERT INTO lifts (userId, workoutId, liftName) VALUES($1, $2, $3) RETURNING id",
        [req.session.userId, workoutId, lift.name]
      )
    )
  ).catch(e => console.error(e));
  // Remove nesting from liftIds. Ex: [{id: 2}. {id: 3}] to [2, 3]
  liftIds = liftIds.map(liftId => liftId.id);
  let setIds = [];
  try {
    setIds = lifts.map(async (lift, index) => {
      console.log("here");
      let newIds = lift.sets.map(set =>
        db.one(
          "INSERT INTO sets (userId, liftId, time_completed, weight, reps, rpe) VALUES ($1, $2, to_timestamp($3), $4, $5, $6) RETURNING id",
          [
            req.session.userId,
            liftIds[index],
            set.timestamp / 1000,
            set.weight,
            set.reps,
            set.rpe
          ]
        )
      );
      newIds = await Promise.all(newIds);
      newIds = newIds.map(newId => newId.id);
      return newIds;
    });
    setIds = await Promise.all(setIds);
  } catch (error) {
    console.error(error);
  }
  res.json({
    status: "success!",
    workoutId: workoutId,
    liftIds: liftIds,
    setIds: setIds
  });
});

router
  .route("/measurement-history")
  .get((req, res) => {
    console.log("userId: ", req.session.userId);
    db.any(
      "SELECT id, measurement_type, time_taken, measurement, unit FROM measurements WHERE userId = $1",
      req.session.userId
    ).then(measurements => {
      let responseData = {};
      measurements.map(entry => {
        let name = entry.measurement_type;
        let unit = entry.unit;
        entry.timestamp = new Date(entry.time_taken).getTime();
        delete entry.measurement_type;
        delete entry.unit;
        delete entry.time_taken;
        if (responseData.hasOwnProperty(name)) {
          responseData[name].measurements.push(entry);
        } else {
          responseData[name] = {
            measurements: [{ ...entry }],
            unit: unit
          };
        }
      });
      res.json(responseData);
    });
  })
  .post((req, res) => {
    const timestamp = req.body.timestamp / 1000;
    db.one(
      "INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES ($1, to_timestamp($2), $3, $4, $5) RETURNING id",
      [
        req.session.userId,
        timestamp,
        req.body.type,
        req.body.measurement,
        req.body.unit
      ]
    )
      .then(data =>
        res.json({
          name: req.body.type,
          measurement: req.body.measurement,
          timestamp: req.body.timestamp,
          id: data.id
        })
      )
      .catch(error => console.error(error));
  });

router.route("/:userId/measurement-history/:type").get((req, res) => {
  db.any(
    "SELECT id, time_taken, measurement, unit FROM measurements WHERE userId = $1 AND measurement_type = $2",
    [req.params.userId, req.params.type]
  ).then(data => res.json(data));
});

module.exports.userDataRouter = router;
module.exports.db = db;
