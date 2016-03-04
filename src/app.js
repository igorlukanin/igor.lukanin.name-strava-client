var config = require('config'),
    Promise = require('promise'),
    rmrf = Promise.denodeify(require('rimraf')),

    git = require('./git'),
    strava = require('./strava'),
    yaml = require('./yaml'),

    directory = config.get('repo.directory'),
    file = config.get('repo.file'),
    path = directory + file,
    entry = config.get('repo.entry'),
    url = config.get('repo.url'),
    remote = config.get('repo.remote'),
    message = config.get('repo.message'),
    author = config.get('repo.author'),
    email = config.get('repo.email'),
    privateKey = config.get('repo.privateKeyFile'),

    updateInterval = config.get('update_interval_minutes') * 60 * 1000 /* milliseconds */;


var update = function() {
    var distance = strava
        .loadAthleteInfo()
        .then(function(info) {
            return strava.loadAthleteStats(info);
        })
        .then(function(stats) {
            return Math.round(stats.ytd_run_totals.distance / 1000);
        });

    var repo = rmrf(directory)
        .then(function() {
            return git.clone(url, directory, privateKey);
        });

    Promise.all([ distance, repo ])
        .then(function(results) {
            var distance = results[0];

            if (distance == yaml.readKey(path, entry)) {
                return Promise.reject(distance);
            }
            else {
                yaml.updateKey(path, entry, distance);
                return Promise.resolve(distance);
            }
        })
        .then(function() {
            return git.add(directory, file);
        })
        .then(function() {
            return git.commit(directory, author, email, message);
        })
        .then(function() {
            return git.push(directory, remote, privateKey);
        })
        .then(function() {
            console.log('Distance updated.');
        }, function() {
            console.log('Distance not updated.');
            console.log(arguments);
        });
};

update();
setInterval(update, updateInterval);