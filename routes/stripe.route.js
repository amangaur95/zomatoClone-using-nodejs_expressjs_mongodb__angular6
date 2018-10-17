const stripe = require("stripe")("Enter Your stripe secret key here");
const express = require('express');
const router = express.Router();

router.post("/charge", function (req, res) {

  let amount = req.body.payment * 100; // 500 cents means $5 
  // create a customer 
  stripe.customers.create({
    email:req.body.data.email,
    source: req.body.token
      // email: req.body.stripeEmail, // customer email, which user need to enter while making payment
      // source: req.body.stripeToken // token for the given card 
    })
    .then((customer) => {
      console.log(customer, "--------------");
      stripe.charges.create({ // charge the customer
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      })
    })
    .then(charge =>
      // console.log(charge)
      res.json({
        code: 200,
        message: 'success'
      })
    ); // render the charge view: views/charge.pug

});

module.exports = router;