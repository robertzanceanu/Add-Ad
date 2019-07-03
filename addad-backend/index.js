const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');

const port = 3001;
const app = express();

const mongoURI = 'mongodb://localhost:27017/AddAd';
mongoose.connect(mongoURI, { useNewUrlParser: true });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
const get = require('./routes/getRoute');
app.use('/api', get);

const post = require('./routes/postRoute');
app.use('/api', post);

app.listen(port, () => console.log("Server is listening on " + port));