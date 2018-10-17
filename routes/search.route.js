const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Newrestaurant = require('../models/newrestaurant.model');

router.post('/searchrestro', function (req, res) {
    var re = new RegExp(req.body.val, "i");
    Newrestaurant.find({
        restaurant_name: {
          $regex: re
        }
      })
      .exec(function (err, result_resto) {
        if (err) {
          res.json({
            err: err,
            message: 'Restaurant not found please try '
          })
        } else {
          res.json({
            code: 200,
            result_restro: result_resto
          })
        }
      })
  })

  router.post('/matchLocation', function (req, res) {
    Newrestaurant.find({
        $or: [{
          city: {"$regex": "^" + req.body.searchLocation + "\\b", "$options": "i" }
        }, {
          restaurant_locality: {"$regex": "^" + req.body.searchLocation + "\\b", "$options": "i" }
        }]
      })
      .exec(function (err, result_locationrestro) {
        if (err) {
          res.json({
            err: err,
            result_locationrestro_message: {
              str1: 'Oops Location Not Found Please',
              str2: ''
            }
          })
        } else {
          res.json({
            code: 200,
            result_locationrestro: result_locationrestro,
            result_locationrestro_message: {
              str1: 'Match Found',
              str2: ''
            }
          })
        }
      })
  })
  
  module.exports = router;