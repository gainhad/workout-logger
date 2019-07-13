const express = require("express");
const pgp = require("pg-promise")();
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(bodyParser.json());

const db = pgp({
  host: "localhost",
  port: 5432,
  database: "workout_logger",
  username: "hadley"
});

router.get("/", (req, res) => {
  res.json({ lift_history: "/api/user-data/:user/lift-history/deadlift" });
});

router.route("/user-data/:username/lift-history/:liftName").get((req, res) => {
  db.task(async task => {
    let lifts = await task.any(
      "SELECT id FROM lifts WHERE username = $1 AND liftName = $2",
      [req.params.username, req.params.liftName]
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
    console.log(data.sets[0]);
    res.json(
      data.lifts.map((lift, index) => ({
        ...lift,
        sets: data.sets[index]
      }))
    );
  });
});

router.route("/user-data/:username/workout-history").post(async (req, res) => {
  const lifts = req.body.lifts;
  const lastLift = lifts[lifts.length - 1];
  const timestamp =
    lastLift.sets[lastLift.sets.length - 1].timeCompleted / 1000;
  const { id: workoutId } = await db.one(
    "INSERT INTO workouts (username, time_completed, duration) VALUES ('demoUser', to_timestamp($1), $2) RETURNING id",
    [timestamp, req.body.duration]
  );
  let liftIds = await Promise.all(
    lifts.map(lift =>
      db.one(
        "INSERT INTO lifts (username, workoutId, liftName) VALUES('demoUser', $1, $2) RETURNING id",
        [workoutId, lift.name]
      )
    )
  );
  // Remove nesting from liftIds. Ex: [{id: 2}. {id: 3}] to [2, 3]
  liftIds = liftIds.map(liftId => liftId.id);
  let setIds = [];
  try {
    setIds = lifts.map(async (lift, index) => {
      let newIds = lift.sets.map(set =>
        db.one(
          "INSERT INTO sets (username, liftId, time_completed, weight, reps, rpe) VALUES ('demoUser', $1, to_timestamp($2), $3, $4, $5) RETURNING id",
          [
            liftIds[index],
            set.timeCompleted / 1000,
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
  .route("/user-data/:username/measurement-history/:type")
  .get((req, res) => {
    db.any(
      "SELECT id, time_taken, measurement, unit FROM measurements WHERE username = $1 AND measurement_type = $2",
      [req.params.username, req.params.type]
    ).then(data => res.json(data));
  })
  .post((req, res) => {
    const timestamp = req.body.time_taken / 1000;
    db.none(
      "INSERT INTO measurements(username, time_taken, measurement_type, measurement, unit) VALUES ('demoUser', to_timestamp($1), $2, $3, $4)",
      [timestamp, req.params.type, req.body.measurement, req.body.unit]
    ).then(data => res.json({ status: "success!" }));
  });

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
