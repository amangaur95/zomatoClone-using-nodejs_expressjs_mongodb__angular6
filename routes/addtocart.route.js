const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/cart.model');

router.post('/addCart', function (req, res) {
    Cart.update({
        user: req.body.userId
      }, {
        $push: {
          items: req.body,
        }
      }, {
        upsert: true
      })
      .exec(function (err, menu_list) {
        if (err) {
          res.json({
            err: err
          })
        } else {
          res.json({
            code: 200,
            menu_list: menu_list,
          })
        }
    })
})

router.get('/getCart/:items', function (req, res) {
    Cart.aggregate([{
          $match: {
            user: mongoose.Types.ObjectId(req.params.items)
          }
        }, {
          $unwind: "$items"
        },
        {
          $group: {
            _id: {
              "food_name": "$items.food_name",
              "food_price": "$items.food_price",
              "food_id": "$items._id",
              "restID":"$items.restID",
              "userId":"$items.userId"
            },
            quantitycount: {
              $sum: 1
            }
          }
        }
      ])
      .exec(function (err, cartitem) {
        if (err) {
          res.json({
            err: err
          })
        } else {
          res.json({
            code: 200,
            cartitem: cartitem
          })
        }
    })
})

router.post('/addcartItem', function(req,res){
    Cart.update({
      user: req.body.item_details._id.userId
    }, {
      $push: {
        items: {
          _id:req.body.item_id,
          food_name:req.body.item_details._id.food_name,
          food_price:req.body.item_details._id.food_price,
          food_desc:req.body.item_details._id.food_desc,
          restID:req.body.item_details._id.restID,
          userId:req.body.item_details._id.userId
        },
      }
    }, {
      upsert: true
    })
    .exec(function (err, menu_list) {
      if (err) {
        res.json({
          err: err
        })
      } else {
        res.json({
          code: 200,
          menu_list: menu_list,
        })
      }
    })
})

router.post('/deletecartItem', function(req,res){
    console.log(req.body.user_id,req.body.item);
    Cart.findOne({"items._id":req.body.item})
    .exec(function(err,deletecartItem){
      if(err){
        res.json({
          err:err,
          failuremessage:'Unable to delete item from cart'
        })
      }
      else{
        console.log(deletecartItem)
        let itemsArr = deletecartItem.items;
        itemsArr.pop();
        Cart.update({"items._id":req.body.item},
          {
            $set:
            {
              items:itemsArr
            }
          }).exec(function(err,updatedData){
            if(err){
  
            }
            else{
              console.log(updatedData)
              res.json({
                code:200,
                deletecartItem:deletecartItem,
                success:'Item Deleted Successfully'
              })
            }
            
          })
        
      }
    })
  })

module.exports = router;