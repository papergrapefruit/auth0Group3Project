// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/create/:id", function(req, res){
    db.Score.findAll({
      where: {
        user: req.params.id,
        random: false
      }
    }).then(function(result){
      var scores = [];
      result.forEach(function(item){
        scores.push(item.dataValues);
      });
      //console.log(scores);
      res.render("create", {scores: scores});
    });
  });

  app.get("/create", function(req, res){
    res.render("create");
  });

  app.get("/random/:id", function(req, res){
    db.Score.findAll({
      where: {
        user: req.params.id,
        random: true
      }
    }).then(function(result){
      var scores = [];
      result.forEach(function(item){
        scores.push(item.dataValues);
      });
      //console.log(scores);
      res.render("random", {scores: scores});
    });
  });

  app.get("/random", function(req, res){
    res.render("random");
  })
};