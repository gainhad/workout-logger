const express = require("express");
const pgp = require("pg-promise")();

const app = express();
const router = express.Router();

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

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
