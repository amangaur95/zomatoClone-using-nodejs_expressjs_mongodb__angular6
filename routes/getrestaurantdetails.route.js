const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Newrestaurant = require('../models/newrestaurant.model');
const Tag = require('../models/tag.model');
const Cuisine = require('../models/cuisine');
const Timing = require('../models/timing.model');

router.get('/newrestaurant/:page', function (req, res) {
  let perPage =  9
  let page = req.params.page || 1
  
  Newrestaurant.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err,restro_details){
      if(err){
        res.json({
          err:err,
          failuremessage:'Unable to find restaurant'
        })
      }
      else{
        Newrestaurant.count().exec(function (err, count) {
        if (err) {
          res.json({
            err: err
          })
        } 
        else {
          res.json({
            code: 200,
            restro_details: restro_details,
            current_page: page,
            pages: Math.ceil(count / perPage),
            perPage:perPage,
            count:count
          })
        }
      })
    }
  })
})

router.get('/tag', function (req, res) {
    Tag.find({})
      .exec(function (err, tags) {
        if (err) {
          res.json({
            err: err
          })
        } else {
          res.json({
            code: 200,
            tags: tags
          })
        }
      })
  })

router.get('/cuisinelist', function (req, res) {
    Cuisine.find({}).exec(function (err, cuisinelist) {
      if (err) {
        res.json({
          err: err
        })
      } else {
        res.json({
          code: 200,
          data: cuisinelist
        });
      }
    });
});

router.get('/timing', function (req, res) {
    Timing.find({})
      .exec(function (err, timing) {
        if (err) {
          res.json({
            err: err
          })
        } else {
          res.json({
            code: 200,
            timing: timing
          })
        }
    })
})

router.get('/newcity/:page', function (req, res) {
  let perPage = 9
  let page =req.params.page || 1
  Newrestaurant.aggregate([{$group:{_id:  { $toUpper: "$city" }}}, {$skip:((perPage * page) - perPage)}, {$limit:perPage}])
  // Newrestaurant.aggregate([{$group:{_id:'$city'}}, {$skip:((perPage * page) - perPage)}, {$limit:perPage}])
    // Newrestaurant.find({})
    // .skip((perPage * page) - perPage)
      // .limit(perPage)
      // .distinct("city")      
      .exec(function (err, newcity) {
        if(err){
          res.json({
            err:err,
            failuremessage:'Unable to find city'
          })
        }
        else{
          Newrestaurant.count().exec(function(err,count){
            if(err){
              res.json({
                err:err,
              })
            }
            else{
              res.json({
                code:200,
                newcity:newcity,
                count:count,
                current_page: page,
                pages: Math.ceil(count / perPage),
                perPage:perPage,
              })
            }
          })
        }
      })
  })

  router.post('/citylocality', function (req, res) {
    Newrestaurant.find({
      city: {"$regex": "^" + req.body.city + "\\b", "$options": "i"}
      })
      .distinct("restaurant_locality")
      .exec(function (err, citylocality) {
        if (err) {
          res.json(err)
        } else {
          res.json({
            code: 200,
            citylocality: citylocality
          })
        }
      })
  })

  router.post('/getlocalrestro', function (req, res) {
    Newrestaurant.find({
        restaurant_locality: req.body.locality
      })
      .exec(function (err, localityrestro) {
        if (err) {
          res.json(err)
        } else {
          res.json({
            code: 200,
            localityrestro: localityrestro
          })
        }
      })
  })

module.exports = router;