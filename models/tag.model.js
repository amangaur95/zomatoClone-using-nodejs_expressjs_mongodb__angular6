const mongoose=require('mongoose');
const tag=mongoose.Schema({
    tag_name:String,
})

module.exports=mongoose.model('Tag',tag);