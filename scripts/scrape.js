const cheerio = require('cheerio');
const axios = require('axios');
const db = require('../models');
// export the scrape function
module.exports = (req, res) => {
    axios.get("https://www.nytimes.com/section/world").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);

        // Now, we grab every .story-body, and do the following:
        $('.story-body').each(function(i, element){
            // Save an empty result object
            const result = {};

            // Add the text, href of every link, and summary and save them as properties of the result object
            result.title = $(this)
                .find('.headline')
                .text();
            result.link = $(this)
                .children('a')
                .attr('href');
            result.blurb = $(this)
                .find('.summary')
                .text();

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function(article){
                })
                .catch(function(err){
                // If an error occurred, send it to the client
                return res.json(err);
            });
        });
        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
    });
};