const mongoose = require('mongoose');


const imgSchema = new mongoose.Schema({
    userId: String,
    name: String    
});
module.exports = mongoose.model('img', imgSchema);
