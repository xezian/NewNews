const express = require('express');
const router = express.Router();
const db = require('../models');
const scrape = require('../scripts/scrape.js')

// GET route to scrape new articles
router.get('/scrape', (req, res) => {
  // First, we grab the body of the html with request
  scrape(req, res);
});

// GET all articles from the db.
router.get('/', (req, res) => {
  db.Article.find({}).then(articles => {
    res.json(articles);
  }).catch(err => {
    res.json(err);
  })
});

module.exports = router;
