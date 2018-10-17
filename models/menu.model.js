const mongoose = require('mongoose');

// const menu = mongoose.Schema({
//     
//     
// });
const menu = mongoose.Schema({
    restaurant_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Newrestaurant' },
    food_services:{ type:String, required : true},
    items:[{
        food_name:{ type:String, required : true },
        food_price:{ type:Number, required : true },
        food_desc:String,
    }]
})

module.exports = mongoose.model('Menu',menu);