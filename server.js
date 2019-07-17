const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const { userDataRouter, db } = require("./api/userData");
const { cookieSecret } = require("./config");
const { OAuth2Client } = require("google-auth-library");
const { clientId } = require("./config");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(
  cookieSession({
    secret: cookieSecret,
    secure: app.get("env") === "production"
  })
);

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

app.use("/api/user-data", userDataRouter);

app
  .get("/api/", (req, res) => {
    res.json({ lift_history: "/api/user-data/:userId/lift-history/:liftName" });
  })
  .post("/api/", (req, res) => console.log(req.headers));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.get("/api/check-authentication", (req, res) => {
  res.json({ status: !!req.session.userId });
});

app.get("/api/login", async (req, res) => {
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
  req.session.userId = userId;
  res.json({ status: true });
});
