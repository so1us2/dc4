import MatchMaker from './matchmaking/MatchMaker.js';
import GameMaster from './gamemaster/GameMaster.js';

class Server {

  constructor() {
    this.socketServices = [];
    this.a = 4;
  }

  init() {
    this.server = require('http').createServer();
    this.io = require('socket.io')(this.server);
    this.io.on('connection', (client) => {
      for (let socketService of this.socketServices) {
        socketService.setupHandlers(client);
      }
    });

    this.server.listen(3000, function(err) {
      if (err) throw err;
      console.log('listening on port 3000');
    });
    return this;
  }

  addSocketService(socketService) {
    this.socketServices.push(socketService);
  }
}

var server = new Server();
server.init();
server.addSocketService(new MatchMaker());
console.log(server.socketServices.length);
server.addSocketService(new GameMaster());
