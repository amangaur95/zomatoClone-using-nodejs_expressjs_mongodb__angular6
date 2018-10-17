const mongoose = require('mongoose');
const timing = mongoose.Schema({
    time:String
});

module.exports = mongoose.model('Timing',timing);