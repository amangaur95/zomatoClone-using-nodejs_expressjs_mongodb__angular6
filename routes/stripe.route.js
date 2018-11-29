const stripe = require("stripe")(" Enter your sceret key here ");
const express = require('express');
const router = express.Router();
const Stripe1 = require('../models/stripe.model');

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
        amount:amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      })
    })
    .then(charge =>{
      console.log(charge,"===============")
      res.json({
        code: 200,
        message: 'success'
      })
    }
    ); // render the charge view: views/charge.pug

});

router.post("/defaultcardtoken", function(req,res){
  (async function() {
    // Create a Customer:
    const customer = await stripe.customers.create({
      source: req.body.token.id,
      email: req.body.token.card.name,
    });
    
    // Charge the Customer instead of the card:
    const charge = await stripe.charges.create({
      amount: 50,
      currency: 'usd',
      customer: customer.id,
    });
      
    // YOUR CODE: Save the customer ID and other info in a database for later.
    console.log(charge,"=========");
    
    const stripe_new = new Stripe1({
      token_id:req.body.token.id,
      card_id:req.body.token.card.id,
      customer_id:customer.id,
      ran_id:req.body.ran_id,
      user:req.body.user
    })
    stripe_new.save(function(err,data){
      if(err){
        console.log(err,"from err")
      }
      else{
        console.log("done");
      }
    })
       
  })();
  
  // (async function() {
  //   Stripe1.findOne({ran_id:req.body.ran_id})
  //   .select({customer_id:1,_id:0})
  //   .exec(function(err,data){
  //     if(err){
  //       console.log(err);
  //     }
  //     else{
  //       const charge1 = stripe.charges.create({
  //         amount: 1500, // $15.00 this time
  //         currency: 'usd',
  //         customer: data.customer_id, // Previously stored, then retrieved
  //       });
  //       console.log(charge1,"aman")
  //     }
  //   })
  //   // When it's time to charge the customer again, retrieve the customer ID.
    

    
  // })();
  
})

router.post('/getcardinfo', function(req,res){
  console.log(req.body);
  Stripe1.findOne({user:req.body.user})
  .exec(function(err,cardinfo){
    if(err){
      res.json({
        err:err,
        success:false
      })
    }
    else{
      stripe.customers.retrieveCard(
        cardinfo.customer_id,
        cardinfo.card_id,
        function(err, card) {
          // asynchronously called
          if(err){
            console.log(err,"err");
          }
          else{
            console.log(card,"from backend")
            res.json({
              card:card,
              success:true,
              code:200,
              token:cardinfo.token_id
            })
          }
        }
      );
    }
  })
})


module.exports = router;