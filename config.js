
module.exports = {
    joke: {
        jokeUrl: process.env.JOKE_URL || 'http://humour-blague.com/blagues-2/index.php#',
        jokeSelector: process.env.JOKE_SELECTOR || '.blague'
    },
    language: process.env.RECOGNITION_LANGUAGE ||'fr-FR',
};
