const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Newrestaurant = require('../models/newrestaurant.model');
const Menu = require('../models/menu.model');

router.get('/getadminrestro/:id', function (req, res) {
    Newrestaurant.find({
        restaurant_admin: req.params.id
      })
      .exec(function (err, newrestaurantlist) {
        if (err) {
          res.json({
            code: 404,
            err: err
          })
        } else {
          res.json({
            code: 200,
            newrestaurantlist: newrestaurantlist
          })
        }
    })
})

router.get('/getrestroadminmenu/:id', function (req, res) {
    Menu.find({
        restaurant_id: req.params.id
      })
      .exec(function (err, admin_menulist) {
        if (err) {
          res.json({
            code: 404,
            err: err
          })
        } else {
          res.json({
            code: 200,
            admin_menulist: admin_menulist
          })
        }
    })
})



module.exports = router;