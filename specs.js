require.paths.push("./lib");
var jasmine = require('jasmine');
var sys = require('sys');

// this is needed for asyncSpecWait
for(var key in jasmine) {
  global[key] = jasmine[key];
}

jasmine.run(__dirname);
