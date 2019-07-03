const router = require('express').Router();
const express = require('express');
const app = express();

const Ad = require('../schemas/AdSchema');

router.get('/get', (req, res) => {
    Ad.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    })
})
module.exports = router;