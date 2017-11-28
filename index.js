
module.exports = function(sails) {

    var tellMeAJoke = require('./lib/tellmeajoke.js');
    var install = require('./lib/install.js');
    var notify = require('./lib/notify.js');

    return {
        tellmeajoke: tellMeAJoke,
        install: install,
        notify: notify
    };
}
