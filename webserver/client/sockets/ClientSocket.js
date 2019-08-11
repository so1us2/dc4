const io = require('socket.io-client');

export default class ClientSocket {

  connect() {
    this.socket = io.connect('http://localhost:3000');
  }

  registerSocketEventListener(eventString, callback) {
    this.socket.on(eventString, callback);
  }

  emitEvent(eventString, data, callback) {
    this.socket.emit(eventString, data, callback);
  }
}
