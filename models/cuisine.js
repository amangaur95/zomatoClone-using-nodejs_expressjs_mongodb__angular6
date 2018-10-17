const mongoose=require('mongoose');
const cuisine=mongoose.Schema({
    cuisine_id: Number,
    cuisine_name:String
})
module.exports = mongoose.model('Cuisine', cuisine);