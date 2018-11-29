const mongoose=require('mongoose');

const stripe=mongoose.Schema({
    token_id : String,
    card_id : String,
    customer_id :String,
    ran_id:String,
    user:String
})
module.exports = mongoose.model('Stripe', stripe);