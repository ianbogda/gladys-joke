// from https://www.codementor.io/johnnyb/how-to-write-a-web-scraper-in-nodejs-du108266t

"use strict"

// Import the dependencies
const cheerio = require("cheerio"),
    req = require("tinyreq")
    ;

// Define the scrape function
function scrape(url, data, cb) {
    // 1. Create the request
    req(url, (err, body) => {
        if (err) { return cb(err); }

        // 2. Parse the HTML
        let $ = cheerio.load(body)
          , pageData = {}
          ;

        // 3. Extract the data
        Object.keys(data).forEach(k => {
            // Trim sentence
            pageData[k] = $(data[k]).text();
        });

        // Send the data in the callback
        cb(null, pageData);
    });
}
