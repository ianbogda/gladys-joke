const config = require('../config.js');
var scrape = require('./scrape.js');
var say = require('./say.js');


module.exports = function(sails) {
	scrape("${config.joke.jokeUrl}", {
        	selector: '${config.joke.jokeSelector}'
	}, (err, data) => {
		var sentence = '';
		var sentences = {};
		sentences = data.match(/[^\r\n]+/g);
		for(var i = 0, len = sentences.length; i < len; i++){
			sentence += ' ' + sentences[i].trim().replace(/ +(?= )/g,'');
		}
		say = 
    		console.log(err || sentence);
		return say({language: "${config.language}".substr(0, 2).toLowerCase(), text: sentence });
	});
};
