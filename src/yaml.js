var fs = require('fs'),
    yaml = require('yaml-js');


var readKey = function(path, key) {
    var data = yaml.load(fs.readFileSync(path));
    return data[key];
};

var updateKey = function(path, key, value) {
    var data = yaml.load(fs.readFileSync(path));
    data[key] = value;
    fs.writeFileSync(path, yaml.dump(data));
};


module.exports = {
    readKey: readKey,
    updateKey: updateKey
};