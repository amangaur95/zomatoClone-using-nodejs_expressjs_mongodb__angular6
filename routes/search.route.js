const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Newrestaurant = require('../models/newrestaurant.model');

router.post('/searchrestro', function (req, res) {
    // Newrestaurant.find({restaurant_name : req.body.val})
    var re = new RegExp(req.body.text, "i");
    Newrestaurant.aggregate([
      {$match:{city:req.body.cityname}}
    ]).exec(function(err, result_restro){
      if(err){
        return res.json({
          err: err,
          message: 'Restaurant not found please try '
        })
      }
      else{
        res.json({
          code:200,
          result_restro:result_restro
        })
      }
    })
    // Newrestaurant.find({
    //     restaurant_name: {
    //       $regex: re
    //     }
    //   })
    //   .exec(function (err, result_resto) {
    //     if (err) {
    //       res.json({
    //         err: err,
    //         message: 'Restaurant not found please try '
    //       })
    //     } else {
    //       res.json({
    //         code: 200,
    //         result_restro: result_resto
    //       })
    //     }
    //   })
  })

  router.post('/matchLocation', function (req, res) {
    Newrestaurant.find({
        $or: [{
          city: {"$regex": "^" + req.body.searchLocation + "\\b", "$options": "i" }
        }, {
          restaurant_locality: {"$regex": "^" + req.body.searchLocation + "\\b", "$options": "i" }
        }]
      })
      .select({restaurant_locality:1,restaurant_name:1})
      .exec(function (err, result_locationrestro) {
        if (err) {
          res.json({
            err: err,
            result_locationrestro_message: {
              str1: 'Something went wrong',
              str2: ''
            }
          })
        } 
        if(result_locationrestro==0){
          res.json({
            success:false,
            result_locationrestro_message: 'Oops Match Not Found',
          })
        }
        else {
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