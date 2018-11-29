const mongoose=require('mongoose');

const cart=mongoose.Schema({
    items: {type: Array},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    totalcartItemPriceAmount: { type:Number },
    ordered: {type: Boolean, default: false},
    clear: {type: Boolean, default: false}
});

module.exports=mongoose.model('Cart',cart);
