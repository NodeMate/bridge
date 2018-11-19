const WS = require('ws');
var util = require('util')
var events = require('events')

var WebSocket = function() {
  const wss = new WS.Server({ port: 48531 });
  this._buffer = []
  this._wss = wss

  var self = this
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      self.emit('message', JSON.parse(message))
    });

    self._sendBuffer()
  });
}

util.inherits(WebSocket, events.EventEmitter);

var websocket = new WebSocket()

websocket._sendBuffer = function() {
  this._buffer.forEach(message => {
    this.send(message)
  })
  this._buffer = []
}

websocket.send = function(message) {
  if (this._wss.clients.size == 0) { return this._buffer.push(message) }
  else {
    this._wss.clients.forEach(ws => {
      ws.send(JSON.stringify(message))
    });
  }

}

module.exports = websocket
