const mongoose = require('mongoose');


const adsSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    TypeOfAp: String,
    // img1: String,
    Address: String,
    Price: String,
    PhoneNumber: String,
    img:[]
});
module.exports = mongoose.model('ApAd', adsSchema);
