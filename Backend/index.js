const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost/onlineBookDB');

const donateSchema = mongoose.Schema({
    name: String,
    phone: Number,
    address: String,
    nameOfBook: String
 }); 

const Donation = mongoose.model('Donation',donateSchema);

app.get('/',function(req,res){
    res.render('index');
});

app.post('/',function(req,res){
    const upload = new Donation({
        name: req.body.nameOfDonor,
        phone: req.body.phoneNumber,
        address: req.body.addressOfDonor,
        nameOfBook: req.body.nameOfBook_PDF
    })
    upload.save();
    res.redirect('/');
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });