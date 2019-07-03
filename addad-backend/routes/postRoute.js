const router = require('express').Router();
const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');

const apad = require('../schemas/AdSchema');
const img = require('../schemas/imgSchema');

global._userID = null;
// global.imgs = null;
var storage = multer.diskStorage({
    destination: '../addad-client/public',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage });

router.post('/post', (req, res) => {
    // var data = req.body.body;
    // console.log(data);

    // console.log(req.body.Title);
    // console.log(req.body.body.Title);
    console.log(req.body.body);
    var newAd = new apad({
        Title: req.body.body.Title,
        Description: req.body.body.Description,
        TypeOfAp: req.body.body.TypeofAp,
        // img1 : req.body.body.img1.name,
        // img: imgs,
        Address: req.body.body.Address,
        Price: req.body.body.Price,
        PhoneNumber: req.body.body.PhoneNumber
    });
    // console.log(req.body.body);
    // console.log(data);
    console.log("Altceva");
    console.log(newAd);
    _userID = newAd._id;
    console.log(_userID);
    newAd.save((err) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, error: err });
        }
        console.log("DA");
        return res.json({ success: true });
    });
});

router.post('/image', upload.array('file'), (req, res) => {
    console.log(req.files);
    var imgs = [];
    for (file in req.files) {
        imgs.push(req.files[file].filename);
    }
    apad.findOne({ _id: _userID }, function (err, data) {
        console.log(imgs);
        for (im in imgs) {
            data.img.push(imgs[im]);
        }
        data.save((err) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, error: err });
            }
            console.log("DA");
            return res.json({ success: true });
        });
    })
})

// router.get('/images',(req,res)=>{
//     img.find((err,data) => {
//         if(err) return res.json({success:false, error: err});
//         return res.json({success:true,data:data});
//     })
// })
module.exports = router;