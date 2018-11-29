const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path=require('path');
const morgan = require('morgan');
const passport = require('passport');
const loginsignup = require('./routes/loginsignup.route');
const config = require('./config/database');
const stripepayment = require('./routes/stripe.route');
const restaurant = require('./routes/addrestaurant.route');
const restaurantdetails = require('./routes/getrestaurantdetails.route');
const search = require('./routes/search.route');
const restaurantadmin = require('./routes/restaurantadmin.route');
const menu = require('./routes/menu.route');
const addtocart = require('./routes/addtocart.route');
const emailverify = require('./routes/emailverify.route');
const forgotpassword = require('./routes/forgotpassword.route');
const resetpassword = require('./routes/resetpassword.route');

mongoose.connect(config.database).then(
// mongoose.connect('mongodb://localhost/zom').then(
      () => {console.log('Database connected!!...') },
      err => { console.log('Can not connect to the database'+ err)}
    );

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(passport.initialize());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000 }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
const PORT = 4000;
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());
app.use(cookieParser());

app.use('/api', loginsignup);
app.use('/pay',stripepayment)
app.use('/restaurant',restaurant);
app.use('/restaurantdetail',restaurantdetails);
app.use('/search',search);
app.use('/restaurantadmin',restaurantadmin);
app.use('/menu',menu);
app.use('/addtocart',addtocart);
app.use('/verify', emailverify);
app.use('/forgotpassword', forgotpassword);
app.use('/resetpassword', resetpassword);
app.use('/defaultcardtoken', stripepayment)
app.use('/getcardinfo', stripepayment);

app.listen(PORT, function(){
   console.log('Server is running on Port',PORT);
});