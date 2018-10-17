const mongoose=require('mongoose');

const cart=mongoose.Schema({
    items: {type: Array},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ordered: {type: Boolean, default: false},
    clear: {type: Boolean, default: false}
});

module.exports=mongoose.model('Cart',cart);
