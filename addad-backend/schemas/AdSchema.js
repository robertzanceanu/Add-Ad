const mongoose = require('mongoose');


const adsSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    TypeOfAp: String,
    Address: String,
    Price: String,
    PhoneNumber: String,
    img:[]
});
module.exports = mongoose.model('ApAd', adsSchema);
