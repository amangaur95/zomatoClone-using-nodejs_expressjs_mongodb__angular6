const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Newrestaurant = require('../models/newrestaurant.model');

router.post('/newrestaurant', function (req, res) {
    const newrestaurant = new Newrestaurant({
      _id: new mongoose.Types.ObjectId(),
      images: req.body.file,
      restaurant_name: req.body.restaurant_name,
      city: req.body.city,
      restaurant_locality: req.body.restaurant_locality,
      owner_ornot: req.body.owner_ornot,
      owner_phone: req.body.owner_phone,
      owner_email: req.body.owner_email,
      phone_number: req.body.phone_number,
      status_val: req.body.status_val,
      address: req.body.address,
      serve_value: req.body.serve_value,
      service_value: req.body.service_value,
      seating_value: req.body.seating_value,
      selectedCategories: req.body.selectedCategories,
      payment: req.body.payment,
      cuisines: req.body.cuisines,
      tags: req.body.tags,
      weekDay: req.body.weekDay,
      restaurant_email: req.body.restaurant_email,
      restaurant_website: req.body.restaurant_website,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      restaurant_admin: req.body.user_id,
    })
    newrestaurant.save().then(function (result_restro) {
      res.json({
        code: 200,
        success: {
          str1: 'Your Restaurant has been created',
          str2: 'You Can See Your Restaurant on Our Restaurant List'
        },
        id: result_restro.id
      });
    }).catch(error => {
      res.json({
        code: 500,
        error: error
      });
    });
  });

  module.exports = router;