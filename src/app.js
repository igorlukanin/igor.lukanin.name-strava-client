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
    branch = config.get('repo.branch'),
    message = config.get('repo.message'),
    author = config.get('repo.author'),
    email = config.get('repo.email'),

    updateInterval = config.get('update_interval_minutes') * 60 * 1000 /* milliseconds */;


var update = () => {
    var distance = strava
        .loadAthleteInfo()
        .then(info => strava.loadAthleteStats(info))
        .then(stats => Math.round(stats.ytd_run_totals.distance / 1000));

    var repo = rmrf(directory)
        .then(() => git.clone(url, directory));

    Promise.all([ distance, repo ])
        .then(results => {
            var distance = results[0];

            if (distance == yaml.readKey(path, entry)) {
                return Promise.reject(distance);
            }
            else {
                yaml.updateKey(path, entry, distance);
                return Promise.resolve(distance);
            }
        })
        .then(() => git.add(directory, file))
        .then(() => git.commit(directory, author, email, message))
        .then(() => git.push(directory, remote, branch))
        .then(() => {
            console.log('Distance updated.')
        })
        .catch(err => {
            console.log('Distance not updated.');
            console.log(err);
        });
};

update();
setInterval(update, updateInterval);