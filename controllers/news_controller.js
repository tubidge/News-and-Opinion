// All them dependencies
const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require('cheerio');
const db = require('../models');

// route to scrape echojs.com and save to DB
router.get('/scrape', (req, res) => {
    axios.get('http://www.echojs.com/').then(response => {
        let $ = cheerio.load(response.data);
        $('article h2').each(function (i, element) {
            let result = {};
            result.title = $(this).children('a').text();
            result.link = $(this).children('a').attr('href');
            console.log(result);
            db.Article.create(result)
                // .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
        });
        res.send('Scrape Complete');
    });
});

// route to get articles from DB
router.get('/articles', (req, res) => {
    db.Article.find({})
        .then(dbArticle => res.json(dbArticle))
        .catch(err => res.json(err));
});

// route to get article note 
router.get('/articles/:id', (req, res) => {
    db.Article.findOne({ _id: req.params.id })
        .populate('note')
        .then(dbArticle => res.json(dbArticle))
        .catch(err => res.json(err));
});

// route to create article note
router.post('/articles/:id', (req, res) => {
    db.Note.create(req.body).then(dbNote => {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    }).then(dbArticle => res.json(dbArticle))
        .catch(err => res.json(err));
});

module.exports = router;