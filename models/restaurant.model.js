const mongoose=require('mongoose');
const restaurant=mongoose.Schema({
    restaurant_name:String,
    restaurant_type:String,
    restaurant_locality:String,
    restaurant_address:String,
    restaurant_cuisine:String,
    restaurant_image:String,
    costfortwo:String,
    hours:String,
    restaurant_featured:String
})

module.exports = mongoose.model('Restaurant', restaurant);