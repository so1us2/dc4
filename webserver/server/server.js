class MatchMaker {

  setupHandlers() {
    return (client) => {
      console.log('client connecting: ', client.id);
      client.on('joinopponentsearch', this.handleJoinOpponentSearch(client));
      client.on('cancelopponentsearch', this.handleCancelOpponentSearch(client));
      client.on('disconnect', () => {console.log('client disconnect: ', client.id);});
      client.on('error', () => {console.log('client error: ', client.id); });
    };
  }

  handleJoinOpponentSearch(client) {
    return (arg1) => {
      console.log('joinopponentsearch received from client:', client.id);
      console.log('Received argument:');
      console.log(arg1);
    };
  }

  handleCancelOpponentSearch(client) {
    return (arg1) => {
      console.log('cancelopponentsearch received from client:', client.id);
      console.log('Received argument:');
      console.log(arg1);
    }
  }

  constructor() {
    this.server = require('http').createServer();
    this.io = require('socket.io')(this.server);
    this.io.on('connection', this.setupHandlers());
    this.server.listen(3000, function(err) {
      if (err) throw err;
      console.log('listening on port 3000');
    })
  }

}

var matchMaker = new MatchMaker();
