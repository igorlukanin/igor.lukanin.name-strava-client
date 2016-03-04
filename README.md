This script periodically updates my [personal website](http://igor.lukanin.name) with data from my [Strava profile](https://www.strava.com/athletes/4443104).

### How it works

1. Retrieve my year-to-date running distance via [Strava API](https://strava.github.io/api/)
2. Clone my static [Jekyll](http://jekyllrb.com)-powered website's [repo](https://github.com/igorlukanin/igor.lukanin.name)
3. Parse the `_config.yml` file, update the distance, dump it back
4. `git add` + `commit` + `push`
5. The website automatically redeploys thanks to Github's support for Jekyll