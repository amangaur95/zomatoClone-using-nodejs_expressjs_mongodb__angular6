const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

let randomToken,host,link;

router.post('/signup', function(req, res) {
  email=req.body.email;
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please pass email and password.'});
    } else {
      User.findOne({email:{
        "$regex": "^" + req.body.email + "\\b", "$options": "i"}
      })
      .exec(function(err,data){
        if(data){
          res.json({success: false,
            msg:{ msg1: 'Either you can login or try new email', msg2: 'Email already exists'},
          })
        }
        else{
          if(validateEmail(email)){
          const newUser =new User({
            name: req.body.name,
            username: req.body.username,
            email: email,
            password: req.body.password
          })
          newUser.save(function(err,data) {
            if (err) {
              return res.json({success: false, msg: {msg1:'Something went wrong'
                ,msg2:'Unable to create new user'}
              });
            }
            randomToken = randomstring.generate(12);
            User.findOneAndUpdate({_id:data._id},{$set:{
              verifiedToken:randomToken
            }}).exec(function(err,updated){
              if(err){
                console.log(err)
              }
              else{
                console.log(updated)
              }
            })
            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: ' ', // Enter your email id(gmail id)
                pass: ' ' // Enter your gmail password
              }
            });
            
            // rand=Math.floor((Math.random() * 100) + 54);
            
            // host=req.get('host'); //if we using localhost 4000 then this   
            host="localhost:4200" //otherwise this
            verificationlink="http://"+host+"/emailverify/"+randomToken;
            const mailOptions = {
              from: ' ', // Enter your email id(gmail id)
              to:email,
              subject: 'Please confirm account',
              text: 'Hello,<br> Please Click on the link to verify your email.<br><a href='+verificationlink+'>Click here to verify</a><br>This link is expire after a single click',
            };
              
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            }); 
            res.json({success: true, 
              msg:{ str1: 'Verify your email now.', str2: 'Successful created new user.'},
              code:200});
          });
        }else{
          res.json({success:false, msg:{msg1:'Email is not a valid email',msg2:'Unable to create new user'}})
        }
      }
      })
            
    }
  });
  
  router.post('/signin', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.json({code:401,success: false, msg: {str1:'Authentication failed.', str2: 'User not found.'}});
      } else {
          if(user.isVerified==true){
        // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
            // if user is found and password is right create a token
            // var token = jwt.sign(user.toJSON(), config.secret);
            var token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });
              User.update({
                _id: user._id
              }, {
                $set: {
                  token: token
                }
              },
              function (err, userupdated) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(userupdated);
                }
              });
            // return the information including token as JSON
            res.json({success: true, 
              token: 'JWT ' + token,
              code:200,
              user:user,
              msg: {
              str1: 'Successfully LoggedIn',
              str2: ''
              }
            });
          } else {
            res.json({code:401, success: false, msg: {str1:'Authentication failed' ,str2:'Wrong password.'}});
          }
        });
        }
        else{
          res.json({
            msg: {
              str1: 'Please verify your email',
              str2: 'Link is send to your registered email'
              }
          })
        }
      }
    });
  });
  
  module.exports = router;