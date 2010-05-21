jasmine-node
======

This node.js module makes the wonderful Pivotal Lab's jasmine (http://github.com/pivotal/jasmine) spec framework available in node.js.

Checkout specs.js in the rood directory and spec/SampleSpecs.js to see how to use it.
--

kiwi install jasmine


==
Easiest way is to use homebrew
== 


  brew install kiwi
  kiwi install jasmine
  cd MY_PROJECT_DIR

  cp ~/.kiwi/current/seeds/jasmine/0.10.3/specs.* .
  
  mkdir ~/spec
  
--

 example spec 

--
var net = require('net');
var sys = require('sys');
var events = require('events');

var Diamond = function(){};
var Async = {}
Async.test_events = new events.EventEmitter();

Async.test = function(before_test_callback,test_callback) {
  before_test_callback.apply(this);
  Async.test_events.addListener("test_connect",
                                function() {                  
                                  test_callback.apply(this) 
                                  asyncSpecDone();

                                }
                              );
  asyncSpecWait(); 
};

Diamond.prototype.isConnected = false;

Diamond.prototype.connect = function(){
  this.isConnected = true;
};

Diamond.prototype.error = function(e) {
  sys.puts(e);
}; 

Diamond.prototype.start = function(config){
  var self = this;
  this.connection = net.createConnection(config.port,config.host);
  this.connection.addListener('connect',function() {
    self.connect();
    Async.test_events.emit("test_connect"); // trigger testing
  });
  this.connection.addListener('error',self.error);
  return this;
};

var net = require('net');
var server = net.createServer(function (stream) {
  stream.setEncoding('utf8');
  stream.addListener('connect', function () {
    stream.write('hello\r\n');
  });
  stream.addListener('data', function (data) {
    stream.write(data);
  });
  stream.addListener('end', function () {
    stream.write('goodbye\r\n');
    stream.end();
  });
});
server.listen(7000, 'localhost');


describe('diamond', function(){
  it('connects to database', function(){
    config = {
      host:'localhost',
      port:'7000',
    };
    var diamond = new Diamond();
    Async.test(
      function() {
        diamond.start(config);
      },
      function() {
        expect(diamond.isConnected).toEqual(true);
      });
  });
});



Develop with us 
===
  * to checkout the pivotal branch of jasmine
  ** git submodule update --init
