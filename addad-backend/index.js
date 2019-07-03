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
// const conn = mongoose.createConnection(mongoURI,{ useNewUrlParser: true });
mongoose.connect(mongoURI, { useNewUrlParser: true });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// let gfs;
// // conn.once('open', function () {
// //   gfs = Grid(conn.db, mongoose.mongo);
// //   gfs.collection('uploads');
// // })

// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     }
//     )
//   }
// });
// const upload=multer({storage});


const get = require('./routes/getRoute');
app.use('/api', get);

const post = require('./routes/postRoute');
app.use('/api', post);
// const apad = require('./schemas/AdSchema');

//app.post('/api/image', (req, res) => {
  // var data = req.body.body;
  // console.log(data);
  //console.log(req.body);
  //res.json({ file: req.file });
  //   // console.log(req.body.Title);
  //   // console.log(req.body.body.Title);
  //   var newAd = new apad({
  //       Title:req.body.body.Title,
  //       Description:req.body.body.Description,
  //       TypeOfAp: req.body.body.TypeOfAp,
  //       // img1 : req.body.body.img1,
  //       Address: req.body.body.Address,
  //       Price: req.body.body.Price,
  //       PhoneNumber: req.body.body.PhoneNumber
  //   });

  // console.log(data);

  //   console.log(newAd);
  //   newAd.save((err) =>{
  //       if (err) {
  //           console.log(err);
  //           return res.json({success:false,error:err});}
  //       console.log("DA");
  //       return res.json({success:true});
  //   });
//});


app.listen(port, () => console.log("Server is listening on " + port));