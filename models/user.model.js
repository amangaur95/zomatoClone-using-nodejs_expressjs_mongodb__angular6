const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const user = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:[true,'Email is required'],
    },
    password: {
        type: String,
        required: true
    },
    token: { type: String, default: '' },
    verifiedToken:{ type:String, default:'' },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type:Boolean, default: false },
    clickStatus:{ type:Number, default:0 },
    passwordResetToken: { type:String, default:'' },
    resetPasswordExpires: { type:Number, default:0 }
});

user.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

user.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', user);