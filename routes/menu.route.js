const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/menu.model');

router.post('/addmenu', async function (req, res) {
  let more_item = req.body.more_item;
  let count = 0;
  for (let index = 0; index < more_item.length; index++) {
    count = count + 1;
    let element = more_item[index];
    try{
      const menu = await Menu.update({
        restaurant_id: req.body.restaurant_id,
        food_services: element.morefood_services,
      }, {
        $push: {
          items: [{
            food_name: element.morefood_name,
            food_price: element.morefood_price,
            food_desc: element.morefood_desc
          }],
        }
      }, {
        upsert: true
      });
      // console.log(menu);
      if(count === more_item.length){
        return res.json({
          code:200,
          success: {
            str1: 'Menu Added',
            str2: 'Now you can see your restaurant'
          }
        })
      }
    }
    catch (err){
      return res.json({
        err:err,
        code:404
      })
    }
  }


  // let query=[];
  // let itemArr=[];
  // for (let index = 0; index < req.body.more_item.length; index++) {
  //   let element = req.body.more_item[index];
  //   query.push(element.morefood_services);
  //   itemArr.push({
  //     food_name:element.morefood_name,
  //     food_price:element.morefood_price,
  //     food_desc:element.morefood_dec
  //   })
  // }
  //   Menu.update({
  //     restaurant_id: req.body.restaurant_id,
  //     food_services : { $in: [query] }
  //   }, {
  //       $push: {
  //         items : itemArr
  //       }
  //     }, {
  //       upsert: true
  //   }).exec(function(err,menuupdated){
  //   if(err){
  //     res.json({
  //       err:err,
  //       code:404
  //     })
  //   }
  //   else{
  //     res.json({
  //       code:200,
  //       menuupdated:menuupdated,
  //       success: {
  //         str1: 'Menu Added',
  //         str2: 'Now you can see your restaurant'
  //       }
  //     })
  //   }
  // })

  // previously working code 

  // Menu.update({
  //   restaurant_id: req.body.restaurant_id,
  //   food_services :req.body.food_services,
  // }, {
  //     $push: {
  //       items :[{
  //         food_name:req.body.food_name,
  //         food_price:req.body.food_price,
  //         food_desc:req.body.food_desc
  //       }],
  //     }
  //   }, {
  //     upsert: true
  // }).exec(function(err,menuupdated){
  //   if(err){
  //     res.json({
  //       err:err,
  //       code:404
  //     })
  //   }
  //   else{
  //     res.json({
  //       code:200,
  //       menuupdated:menuupdated,
  //       success: {
  //         str1: 'Menu Added',
  //         str2: 'Now you can see your restaurant'
  //       }
  //     })
  //   }
  // })

})

router.get('/getmenu/:id', function (req, res) {
  Menu.find({
      restaurant_id: req.params.id
    })
    .select({
      restaurant_name: 1,
      food_services: 1,
      items: 1,
      restaurant_id: 1
    })
    .exec(function (err, menu_list) {
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

router.post('/updatemenuitem', function (req, res) {
  Menu.findOneAndUpdate({
    "items._id": req.body.item_id,
  },
  {
    $set: {
      "items.$.food_name":req.body.food_name,
      "items.$.food_price":req.body.food_price,
      "items.$.food_desc":req.body.food_desc
    }
  }
  )
  .exec(function (err, itemupdated) {
    if (err) {
      res.json({
        err: err,
        code: 404
      })
    } else {
      res.json({
        code: 200,
        success: {
          str1: 'Menu Added',
          str2: 'Now you can see your restaurant'
        }
      })
    }
  })
  // Menu.updateOne({
  //     "items._id": req.body.item_id,
  //   }, {
  //     $set: {
  //       items: [{
  //         food_name: req.body.food_name,
  //         food_price: req.body.food_price,
  //         food_desc: req.body.food_desc
  //       }],
  //     }
  //   })
  //   .exec(function (err, itemupdated) {
  //     if (err) {
  //       res.json({
  //         err: err,
  //         code: 404
  //       })
  //     } else {
  //       res.json({
  //         code: 200,
  //         success: {
  //           str1: 'Menu Added',
  //           str2: 'Now you can see your restaurant'
  //         }
  //       })
  //     }
  //   })
})

router.get('/editfooditem/:id', function (req, res) {
  Menu.findOne({"items._id":req.params.id},
  { 'items.$': 1 ,food_services:1})
  .exec(function(err,editfooditem){
    if (err) {
      res.json({
        code: 404,
        err: err
      })
    } 
    else {
      res.json({
        code: 200,
        editfooditem: editfooditem
      })
    }
  })
  // Menu.aggregate([{
  //     $match: {
  //       "items._id": mongoose.Types.ObjectId(req.params.id)
  //     }
  //   }, ])
  //   .exec(function (err, editfooditem) {
  //     if (err) {
  //       res.json({
  //         code: 404,
  //         err: err
  //       })
  //     } else {
  //       res.json({
  //         code: 200,
  //         editfooditem: editfooditem
  //       })
  //     }
  //   })
})

router.post('/deletemenuitem', function (req, res) {
  Menu.findByIdAndUpdate({_id:req.body.menu_id},{ $pull: { items: { _id: req.body.id } } })
  .exec(function(err,data){
    if(err){
      res.json({
        err:err,
        failuremessage: 'Unable to delete item from menu list'
      })
    }
    else{
      res.json({
        code:200,
        success:'Delete Successfully'
      })
    }
  })
})
  // Menu.remove({
  //     "items._id": req.params.id
  //   })
  //   .exec(function (err, deletefrommenu) {
  //     if (err) {
  //       res.json({
  //         err: err,
  //         failuremessage: 'Unable to delete item from menu list'
  //       })
  //     } else {
  //       res.json({
  //         code: 200,
  //         success: 'Deleted Successfully'
  //       })
  //     }
  //   })
// })

module.exports = router;
