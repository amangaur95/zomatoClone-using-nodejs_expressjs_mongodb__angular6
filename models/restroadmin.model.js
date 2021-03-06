const mongoose = require('mongoose');

const restroadmin = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name:{ type: String, required:true},
   username:{ type:String, required: true},
   email: { type: String, required: true},
   password: { type: String, required: true},
   token: { type: String, default: '' }
});

module.exports = mongoose.model('Restroadmin', restroadmin);
