var client = require('strava-v3'),
    config = require('config'),
    Promise = require('promise');


var setClientId = function(value) {
    client.util.config.client_id = value;
};


var setClientSecret = function(value) {
    client.util.config.client_secret = value;
};


var setAccessToken = function(value) {
    client.util.config.access_token = value;
};

var configure = function() {
    setClientId(config.get('strava.client_id'));
    setClientSecret(config.get('strava.client_secret'));
    setAccessToken(config.get('strava.access_token'));
};

var loadAthleteInfo = function() {
    return Promise.denodeify(client.athlete.get);
};


configure();


module.exports = {
    loadAthleteInfo: loadAthleteInfo
};