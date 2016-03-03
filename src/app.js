var strava = require('./strava');

strava
    .loadAthleteInfo()
    .then(function(info) {
        return strava
            .loadAthleteStats(info)
            .then(function(stats) {
                var distance_km = Math.round(stats.ytd_run_totals.distance / 1000);
                console.log(distance_km);
            });
    }, function() {
        console.log(arguments);
    });