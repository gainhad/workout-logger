const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const userDataRouter = require("./api/userData");
const { cookieSecret } = require("./config");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(
  cookieSession({
    secret: cookieSecret,
    secure: app.get("env") === "production"
  })
);

app.use("/api/user-data", userDataRouter);

app
  .get("/api/", (req, res) => {
    res.json({ lift_history: "/api/user-data/:userId/lift-history/:liftName" });
  })
  .post("/api/", (req, res) => console.log(req.headers));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
