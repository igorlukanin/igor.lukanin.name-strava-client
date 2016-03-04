var Promise = require('promise'),
    exec = Promise.denodeify(require('child_process').exec);


var clone = function(url, directory) {
    return exec('git clone "' + url + '" "' + directory + '"');
};

var add = function(directory, path) {
    return exec('cd "' + directory + '" && git add "' + path + '"');
};

var commit = function(directory, message) {
    return exec('cd "' + directory + '" && git commit -m "' + message + '"');
};

var push = function(directory, remote, privateKey) {
    process.env.GIT_SSH_COMMAND = 'ssh -i "' + privateKey + '"';

    return exec('cd "' + directory + '" && git push "' + remote + '"');
};


module.exports = {
    clone: clone,
    add: add,
    commit: commit,
    push: push
};