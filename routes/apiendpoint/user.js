const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../models/Users");
const TimeSheets = require("../../models/TimeSheet");

router.post("/login", (req, res) => {
  console.log(req.body, "here");

  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  User.findOne({ email }).then((user) => {
    // console.log(user, "here", email);
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          Role: user.Role,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556929,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
router.post("/register", (req, res) => {
  console.log("here it is", req.body);
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
router.post("/timesheet", (req, res) => {
  const newUser = new TimeSheets({
    name: req.body.name,
    month: req.body.month,
    date: req.body.date,
    clockin: req.body.clockin,
    clockout: req.body.clockout,
    Action: req.body.Action,
  });
  console.log(newUser._id);
  bcrypt.genSalt(10, (err, salt) => {
    newUser
      .save()
      .then((user) => {
        return res.json({ user, userID: newUser._id });
      })
      .catch((err) => console.log(err));
  });
});
router.post("/updateClockout", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  TimeSheets.findById(id).then((user) => {
    if (!user) {
      return res.json({ name: "User not found" });
    } else {
      user.clockout = req.body.clockout;
      bcrypt.genSalt(10, (err, salt) => {
        user.save().catch((err) => console.log(err));
      });
      return res.json({ email: "user Exists", user: user });
    }
  });
});
router.post("/lastAction", (req, res) => {
  const id = req.body.id;
  TimeSheets.findById(id).then((user) => {
    if (!user) {
      return res.json({ name: "User not found" });
    } else {
      console.log(user);
      return res.json({ email: "user Exists", user: user });
    }
  });
});
module.exports = router;
