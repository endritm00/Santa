require('dotenv').config()
var express = require('express');
var app = express();
const path = require('path');
const stripe = require("stripe")("your_secret_key");
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
var Customer = require('./database/customer.schema');
const fastcsv = require("fast-csv");
const fs = require("fs");

const ObjectsToCsv = require('objects-to-csv')

const db = mongoose.connection;

app.use(express.json());


app.get('/csv', function (req, res) {
    db.collection('customers').find({}).toArray( async function (err, result) {
    const fields = ['customer_email', 'payment_id', 'child_name'];
      const opts = { fields };
      try {
        const csv = new ObjectsToCsv(result)
        await csv.toDisk('./helloworld.csv')

        res.download(__dirname + "/helloworld.csv");
      } catch (err) {
        res.send(err);
      }      
    });
  
})

app.get('/', function (req, res) {
  res.send('');
});

app.get('/exportCsv', function(req,res){
  res.sendFile(__dirname + "/exportCsv.html");
});

app.get('/index', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get('/paymentSuccess', function (req, res) {
  res.sendFile(__dirname + "/paymentSuccess.html");
});

app.get('/checkout', function (req, res) {
  res.sendFile(__dirname + '/checkout.html');
});

app.post("/create-payment-intent", async (req, res) => {

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1499,
    currency: "usd",
    metadata: {
      child_name: req.body.child_name,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});



function sendEmail(subject, html, attachments, to) {
  var mailOptions = {
    from: 'endritkb24@gmail.com',
    to,
    subject,
    html,
    attachments,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function getDate() {
  let date_ob = new Date();

  let date = ("0" + date_ob.getDate()).slice(-2);

  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  let year = date_ob.getFullYear();

  let hours = date_ob.getHours();

  let minutes = date_ob.getMinutes();

  return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
}

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
  // wh_sec implement .env 
  let event;
  try {
    event = request.body;
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object.charges.data;

      var payment_amount = event.data.object.amount / 100;
      var paymentId = event.data.object.id;
      var city = paymentIntent[0].billing_details.address.city;
      var name = paymentIntent[0].billing_details.name;
      var child_name = paymentIntent[0].billing_details.address.line1;
      var child_city = paymentIntent[0].billing_details.address.line2;
      var target_email = paymentIntent[0].billing_details.email;
      var current_date = getDate();

      var child_list = JSON.parse(child_name);

      const customer = new Customer({
        customer_email: target_email,
        payment_id: paymentId,
        child_name: child_name,
        child_city: child_city
      });

      customer.save(function (err, customer) {
        if (err) return console.error(err);
        console.log("Saved customer to database");
        return;
      });

      child_name = child_list.join(" <br /> ");

      sendEmail('test', `<div id="gd-page-1" class="gd-page loaded">
      <div class="gd-wrapper">
      <div class="pg1div pg1page">
      <img src=""></img>
      <div class="pg1div">
      <div class="pg1div"><span class="pg1span pg1text001">Ho Ho Ho!!!</span></div>
      <div class="pg1div"><span class="pg1span pg1text001">Santa here! Mrs. Claus and I are so excited to have you all join us for the live stream at </span><span class="pg1span pg1text002">12pm </span>
      <div class="pg1div"></div>
      <span class="pg1span pg1text002">(EST) on Saturday, November 28th.</span><span class="pg1span pg1text001"> </span><span class="pg1span pg1text001">This is a live event and will not be available after the </span>
      <div class="pg1div"></div>
      <span class="pg1span pg1text001">stream.</span></div>
      <img src="https://url.upwork.com/_01MHw7_uhs38o5-y78tZ6FjGh8OwaXtfLb"></img>
      <div class="pg1div"><span class="pg1span pg1text001">Shhhh! Don&rsquo;t tell the kiddos, but I&rsquo;ve added their names to my Nice List:</span></div>
      <div class="pg1div"><span class="pg1span pg1text001"><h1>${child_name}</h1></span></div>
      <img src="https://url.upwork.com/_01MHw7_uhs38qhnq8fpFsQX66SA79i2h9H"></img>
      <div class="pg1div"><span class="pg1span pg1text002">IMPORTANT:</span><span class="pg1span pg1text001"> </span><span class="pg1span pg1text001">We want to make sure you don&rsquo;t have any issues watching the live stream, so </span><span class="pg1span pg1text001">please go to the Magic Portal link below to test the following:</span></div>
      <div class="pg1div"><span class="pg1span pg1text001">1-</span><span class="pg1span pg1text001">Make sure you are able to login using this email address: ${target_email}L</span><span class="pg1span pg1text003"></span></div>
      <div class="pg1div"><span class="pg1span pg1text001">2-</span><span class="pg1span pg1text001">Make sure you are able to see the countdown video</span></div>
      <div class="pg1div"><span class="pg1span pg1text001">3-</span><span class="pg1span pg1text001">Make sure you are able to hear the music playing</span></div>
      <div class="pg1div"><span class="pg1span pg1text001">If you can&rsquo;t log in, if you can&rsquo;t hear music, or you can&rsquo;t see the countdown, my elves are here </span><span class="pg1span pg1text001">and ready to help. Email them for assistance: </span>
      <div class="pg1div"><span class="pg1span pg1text001">elfhelp@santastream.com</span></div>
      <img src="https://url.upwork.com/_01MHw7_uhs38oR4ktl4jZP-ZPnOVhsayuU"></img>
      <span class="pg1span pg1text001">.</span></div>
      </div>
      <div class="pg1div">
      <div class="pg1div" title="Logo, company name
      
      Description automatically generated"></div>
      </div>
      <div class="pg1div"></div>
      <div class="pg1div">
      <div class="pg1div" title="A picture containing icon
      
      Description automatically generated"></div>
      </div>
      </div>
      </div>
      </div>
      <div id="gd-page-2" class="gd-page loaded">
      <div class="gd-wrapper">
      <div class="pg2div pg2page">
      <div class="pg2div">
      <div class="pg2div"><span class="pg2span pg2text001">Santa will take questions live during the stream, but we encourage you to go ahead and submit </span><span class="pg2span pg2text001">a question to Santa now and he may answer it live on the stream. </span><span class="pg2span pg2text002">You can ask your question by </span><span class="pg2span pg2text002">using the Magic Portal link below.</span></div>
      <div class="pg2div">
      <img src="https://url.upwork.com/_01MHw7_uhs38oO17B424FZhh2Tog5PsmcG"></img>
      <div class="pg2div"><span class="pg2span pg2text002">https://live.SantaStream.com</span></div>
      </div>
      <div class="pg2div"><span class="pg2span pg2text003">(Remember: only one device at a time can be logged in to this URL)</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">Thanks for joining my live stream. We&rsquo;re all so excited here in the North Pole!</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">Merry Christmas!</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">Santa Claus</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">==============</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">Receipt: PAID</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">${current_date}</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">Payment ID: ${paymentId}</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">1x Ticket: $${payment_amount}</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">Total: $${payment_amount}</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">===============</span></div>
      <div class="pg2div"><span class="pg2span pg2text001">Questions? Email </span>
      <div class="pg2div"><span class="pg2span pg2text001">elfhelp@santastream.com</span></div>
      </div>
      </div>
      <div class="pg2div"></div>
      <div class="pg2div"></div>
      </div>
      </div>
      </div>`, [],target_email);
      //console.lo  g('PaymentIntent was successful!', paymentIntent);
      response.sendStatus(200);      
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
          console.log(`Unhandled event type ${event.type}`);
  }
});


app.use(express.static(path.join(__dirname, '/')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


