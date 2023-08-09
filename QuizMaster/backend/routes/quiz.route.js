const express = require('express');
const app = express();
const quizRoute = express.Router();
const cors = require("cors");

var whitelist = ["http://localhost:4200", "http://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; 
  }
  callback(null, corsOptions);
};

let Quiz = require('../models/Quiz');

quizRoute.route('/admin/new').post(async (req, res, next) => {
    await Quiz.create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
   

quizRoute
  .route("/admin", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    await Quiz.find()
      .then((result) => {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        return next(err);
      });
  });

quizRoute.route('/read/:id').get(async (req, res, next) => {
    await Quiz.findById(req.params.id, req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully retrieved.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

quizRoute.route("/admin/edit/:id").put(async (req, res, next) => {
    await Quiz.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
      .then((result) => {
        res.json({
          data: result,
          msg: "Data successfully updated.",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

quizRoute.route("/admin/delete/:id").delete(async (req, res) => {
await Quiz.findByIdAndRemove(req.params.id)
    .then(() => {
    res.json({
        msg: "Data successfully updated.",
    });
    })
    .catch((err) => {
    console.log(err);
    });
});

module.exports = quizRoute;