var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Get a user by email and password
  app.get("/api/users", function (req, res) {
    db.User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });

  app.get("/api/users/:UserId", function (req, res) {
    db.Item.findAll({ include: [db.User], where: req.params }).then(data => res.json(data)).catch(err => res.json(err));
  })

  // Create a new user
  app.post("/api/users", function (req, res) {
    db.User.create(req.body).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });

  //Edit a user's info
  app.put("/api/users", function (req, res) {
    db.User.update(req.body, { where: { id: req.user.id } }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  })

  // Delete a user
  app.delete("/api/users", function (req, res) {
    req.logout();
    db.User.destroy({
      where: {
        id: req.body
      }
    }).then(function (data) {
      res.json(data);
      
    }).catch(err => res.json(err));
  });
};
