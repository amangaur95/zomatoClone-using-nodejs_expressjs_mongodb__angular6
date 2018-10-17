const mongoose = require('mongoose');
const newrestaurant = mongoose.Schema({
    images : { type:String },
    restaurant_name : { type:String, required:true },
    city : { type:String, required:true },
    restaurant_locality: { type:String, required:true },
    owner_ornot : { type:String, default:'' },
    owner_phone : { type:String, default:'' },
    owner_email : { type:String, default:'' },
    phone_number : { type:String, default:'' },
    status_val : { type:String, default:'' },
    address : { type:String, default:'' },
    serve_value : { type:String, default:'' },
    service_value : { type:String, default:'' },
    seating_value : { type:String, default:'' },
    selectedCategories : { type:String, default:'' },
    payment : { type:String, default:'' },
    cuisines : { type:Object, default:'' },
    tags : { type:Object, default:'' },
    weekDay : { type:String, default:'' },
    restaurant_email : { type:String, default:'' },
    restaurant_website : { type:String, default:'' },
    startTime :{ type:Object, default:'' },
    endTime : { type:Object, default:'' },
    restaurant_admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Newrestaurant',newrestaurant);