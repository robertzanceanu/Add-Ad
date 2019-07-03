const router = require('express').Router();
const express = require('express');
const app = express();

const Ad = require('../schemas/AdSchema');

router.get('/get', (req, res) => {
    Ad.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        // for (date in data) {
        //     var datas = data[date];
        //     // console.log(datas);
        //     // datas.push({img:123});
        //     datas.img=123;
        //     console.log(datas);
        //     // console.log(data[date]);
        //     // data[date]=datas;
        // }

        // datas.img="1234";
        return res.json({ success: true, data: data });
    })
})
module.exports = router;