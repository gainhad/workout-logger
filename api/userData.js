const express = require("express");
const pgp = require("pg-promise")();
const { OAuth2Client } = require("google-auth-library");
const { clientId } = require("../config");

const client = new OAuth2Client(clientId);
const router = express.Router();

const db = pgp({
  host: "localhost",
  port: 5432,
  database: "workout_logger",
  username: "hadley"
});

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
    const idToken = await verifyToken(token).catch(error => console.log(error));
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

router.route("/get-user-id").get(async (req, res) => {
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
          .then(data => data.userid);
      }
    });
  console.log(userId);
  /*
  console.log(userId);
  console.log(!userId);
  if (!userId) {
    userId = await db
      .one("INSERT INTO users (googleId) VALUES ($1) RETURNING userID", idToken)
      .then(data => data.userid);
  }
*/
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

router.route("/:userId/lift-history").get((req, res) => {
  db.task(async task => {
    let lifts = await task.any(
      "SELECT id, liftName FROM lifts WHERE userId = $1",
      req.params.userId
    );
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

router.route("/:userId/workout-history").post(async (req, res) => {
  const lifts = req.body.lifts;
  const lastLift = lifts[lifts.length - 1];
  const timestamp = lastLift.sets[lastLift.sets.length - 1].timestamp / 1000;
  const { id: workoutId } = await db
    .one(
      "INSERT INTO workouts (userId, time_completed, duration) VALUES (1, to_timestamp($1), $2) RETURNING id",
      [timestamp, req.body.duration]
    )
    .catch(e => console.log(e));
  let liftIds = await Promise.all(
    lifts.map(lift =>
      db.one(
        "INSERT INTO lifts (userId, workoutId, liftName) VALUES(1, $1, $2) RETURNING id",
        [workoutId, lift.name]
      )
    )
  ).catch(e => console.log(e));
  // Remove nesting from liftIds. Ex: [{id: 2}. {id: 3}] to [2, 3]
  liftIds = liftIds.map(liftId => liftId.id);
  let setIds = [];
  try {
    setIds = lifts.map(async (lift, index) => {
      let newIds = lift.sets.map(set =>
        db.one(
          "INSERT INTO sets (userId, liftId, time_completed, weight, reps, rpe) VALUES (userId, $1, to_timestamp($2), $3, $4, $5) RETURNING id",
          [liftIds[index], set.timestamp / 1000, set.weight, set.reps, set.rpe]
        )
      );
      newIds = await Promise.all(newIds);
      newIds = newIds.map(newId => newId.id);
      return newIds;
    });
    setIds = await Promise.all(setIds);
  } catch (error) {
    console.log(error);
  }
  res.json({
    status: "success!",
    workoutId: workoutId,
    liftIds: liftIds,
    setIds: setIds
  });
});

router
  .route("/:userId/measurement-history")
  .get((req, res) => {
    db.any(
      "SELECT id, measurement_type, time_taken, measurement, unit FROM measurements WHERE userId = $1",
      req.params.userId
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
      "INSERT INTO measurements(userId, time_taken, measurement_type, measurement, unit) VALUES (1, timestamp($1), $2, $3, $4) RETURNING id",
      [timestamp, req.body.type, req.body.measurement, req.body.unit]
    ).then(data =>
      res.json({
        name: req.body.type,
        measurement: req.body.measurement,
        timestamp: req.body.timestamp,
        id: data.id
      })
    );
  });

router.route("/:userId/measurement-history/:type").get((req, res) => {
  db.any(
    "SELECT id, time_taken, measurement, unit FROM measurements WHERE userId = $1 AND measurement_type = $2",
    [req.params.userId, req.params.type]
  ).then(data => res.json(data));
});

module.exports = router;
