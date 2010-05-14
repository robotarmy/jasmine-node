require.paths.push("./lib");
var jasmine = require('jazz');
var sys = require('sys');

// this is needed for asyncSpecWait
for(var key in jasmine) {
  global[key] = jasmine[key];
}

jasmine.run(__dirname);
