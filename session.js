const secret = process.env["secret"] || "hackyAuth";
const md5 = require("md5");
const User = require("./models/User");

const createSignedSessionId = email => {
  return `${email}:${generateSignature(email)}`;
};

const generateSignature = email => md5(email + "banana");

const loggedInOnly = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.json({message: "You are not logged in"});
  }
};

const loggedOutOnly = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.json({message: "You are already logged in"});
  }
};

const loginMiddleware = (req, res, next) => {
  const sessionId = req.query.sessionId;
  if (!sessionId) return next();

  const [email, signature] = sessionId.split(":");

  if (signature === generateSignature(email)) {
    User.findOne({ email })
      .then((user) => {
        console.log("user", user)
        req.user = user;
        next();
      })
  } else {
    res.json({message: "You've tampered with your session!"});
  }
};

module.exports = {
  createSignedSessionId,
  generateSignature,
  loginMiddleware,
  loggedOutOnly,
  loggedInOnly
};