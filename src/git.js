var Promise = require('promise'),
    exec = Promise.denodeify(require('child_process').exec);


var clone = function(url, directory) {
    return exec('git clone "' + url + '" "' + directory + '"');
};

var add = function(directory, path) {
    return exec('cd "' + directory + '" && ' +
                'git add "' + path + '"');
};

var commit = function(directory, author, email, message) {
    return exec('cd "' + directory + '" && ' +
                'git config user.name "' + author + '" && ' +
                'git config user.email "' + email + '" && ' +
                'git commit --author "' + author + '" -m "' + message + '"');
};

var push = function(directory, remote, branch) {
    return exec('cd "' + directory + '" && ' +
                'git push "' + remote + '" "' + branch + '"');
};


module.exports = {
    clone: clone,
    add: add,
    commit: commit,
    push: push
};