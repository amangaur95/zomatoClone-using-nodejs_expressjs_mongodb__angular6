const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/menu.model');

router.post('/addmenu',function(req,res){
    Menu.update({
      restaurant_id: req.body.restaurant_id,
      food_services :req.body.food_services,
    }, {
      $push: {
        items :[{
          food_name:req.body.food_name,
          food_price:req.body.food_price,
          food_desc:req.body.food_desc
        }],
      }
    }, {
      upsert: true
    }).exec(function(err,menuupdated){
      if(err){
        res.json({
          err:err,
          code:404
        })
      }
      else{
        res.json({
          code:200,
          menuupdated:menuupdated,
          success: {
                    str1: 'Menu Added',
                    str2: 'Now you can see your restaurant'
                  }
        })
      }
    })
})

router.get('/getmenu/:id', function (req, res) {
  Menu.find({
      restaurant_id: req.params.id
    })
    .select({
      food_services: 1,
      items: 1,
      restaurant_id: 1
    })
  .exec(function (err, menu_list) {
      // console.log(menu_list)
      if (err) {
        res.json({
          err: err
        })
      } else {
        res.json({
          code: 200,
          menu_list: menu_list
        })
      }
    })
})

router.post('/updatemenuitem', function(req,res){
  Menu.updateOne({
    "items._id": req.body.item_id,
  }, {
    $set: {
      items :[{
        food_name:req.body.food_name,
        food_price:req.body.food_price,
        food_desc:req.body.food_desc
      }],
    }
  })
  .exec(function(err,itemupdated){
    if(err){
      res.json({
        err:err,
        code:404
      })
    }
    else{
      res.json({
        code:200,
        success: {
                  str1: 'Menu Added',
                  str2: 'Now you can see your restaurant'
                }
      })
    }
  })
})

router.get('/editfooditem/:id', function(req,res){
  Menu.aggregate([{$match:{"items._id":mongoose.Types.ObjectId(req.params.id)}},
])
  .exec(function(err,editfooditem){
    if(err){
      res.json({
        code:404,
        err:err
      })
    }
    else{
      res.json({
        code:200,
        editfooditem:editfooditem
      })
    }
  })
})

router.get('/deletemenuitem/:id', function(req,res){
  Menu.remove({"items._id":req.params.id})
  .exec(function(err,deletefrommenu){
    if(err){
      res.json({
        err:err,
        failuremessage:'Unable to delete item from menu list'
      })
    }
    else{
      res.json({
        code:200,
        success:'Deleted Successfully'
      })
    }
  })
})

module.exports = router;