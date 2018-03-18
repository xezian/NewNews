const express = require('express');
const router = express.Router();
const db = require('../models');
const cheerio = require('cheerio');
const axios = require('axios')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
