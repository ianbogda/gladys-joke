const config = require('../config.js');
const scrape = require('./scrape.js');
const say = require('./say.js');

var language = config.language.substr(0, 2).toLowerCase();


module.exports = function(sails) {

    var riddle = /^(quel|qu\'est|que|quel|combien|pourquoi)/i;
    var sirAndMadam = /(monsieur et madame|fils|fille)/i;
    var QandA = {};

    scrape("${config.joke.jokeUrl}",
        { selector: '${config.joke.jokeSelector}' },
        (err, data) => {

            var sentence = '';
            var sentences = {};
            sentences = data.match(/[^\r\n]+/g);
            for(var i = 0, len = sentences.length; i < len; i++){
                sentence += ' ' + sentences[i].trim().replace(/ (?= )/g,' ');
            }
            console.log(err || sentence);

            // Check if sentence is riddle or sir and madam joke
            var QandAForm = false;
            if(sentence.match(sirAndMadam).length > 2 || sentence.match(riddle).length){
                QandA = getAandAForm(sentence);

                say({language: language, text: QandA.question });
                sleep(2000);
                say({language: language, text: QandA.answer });
            }else {
                say({language: language, text: sentence });
            }

            jokedropping();
        }
    );
};

function getQandAForm(sentence){
    var question;
    var answer;
    // check for ? or : to add suspense in the enunciation
    var questionmark = sentence.match(/(\?|\:)/);
    if(questionmark){
        question = sentence.substr(0, questionmark) + " ?";
        answer = sentence.substr(questionmark + 1);
    }
    return {'question': question,
            'answer': answer};
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function jokedropping(){
    fs.createReadStream(config.gong)
    .pipe(new lame.Decoder())
    .on('format', function (format) {
        var speaker = new Speaker(format);
        speaker.on('close', function(){
            pause(cb);
        });
        this.pipe(speaker);
    });
}
