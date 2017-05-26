require("es6-promise").polyfill;

const express = require('express');
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


var mongoose = require('mongoose');
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')(req).then(() => next());
  }
});

const User = require("./models/User");
const Board = require("./models/Board");
const List = require("./models/List");
const Card = require("./models/Card");
const Activity = require("./models/Activity");

const {
  createSignedSessionId,
  loginMiddleware,
  loggedInOnly,
  loggedOutOnly,
  generateSignature
} = require("./session");

app.use(loginMiddleware);


app.get('/api/boards', loggedInOnly, (req, res, next) => {
	console.log("hit endpoint");
  Board.find()
    .populate('users')
    .populate({
      path: 'lists',
      populate: {
        path: 'cards',
        populate: {
          path: 'users activities'
        }
      }
    })
    .then(boards => {
      res.json(boards);
    })
    .catch(next);
});

const loginJson = (success, error, user = null, sessionId = "") => {
  return {
    success,
    error,
    user: user ? { email: user.email } : null,
    sessionId
  }
}

app.post("/api/login", (req, res) => {
  let { email, password, sessionId } = req.body;
  let signature;
  if (sessionId) {
    [email, signature] = sessionId.split(":"); 
  }
  User.findOne({ email }, (err, user) => {
    if (!user) return res.json(loginJson(false, "No user"));

    if ((sessionId && signature === generateSignature(email)) || user.validatePassword(password)) {
      const sessionId = createSignedSessionId(email);
      res.json(loginJson(true, "", user, sessionId));
    } else {
      res.json(loginJson(false, "Wrong password"));
    }
  });
});

app.use((err, req, res, next) => {
  console.error(`Error: ${err.stack}`);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}/`);
});