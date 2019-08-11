import ActiveSearcherDirectory from './ActiveSearcherDirectory';

export default class MatchMaker {
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
      this.activeSearcherDirectory.addSearcher(client);
      if (this.activeSearcherDirectory.hasTwo()) {
        console.log("There are two.  Trying to handle it!");
        this.handleMatchFound();
      } else {
        console.log("There are not two.  Waiting for opponent.");
      }
    };
  }

  handleCancelOpponentSearch(client) {
    return (arg1) => {
      console.log('cancelopponentsearch received from client:', client.id);
      console.log('Received argument:');
      console.log(arg1);
      this.activeSearcherDirectory.removeSearcher(client);
    }
  }

  handleMatchFound() {
    console.log("Handling match found.  Let's begin by extracing the two fellas.");
    var searcher1;
    var searcher2;
    [searcher1, searcher2] = this.activeSearcherDirectory.getTwo();
    console.log("Got them.  Here are their ids:");
    console.log(searcher1.client.id);
    console.log(searcher2.client.id);
  }

  constructor() {
    this.activeSearcherDirectory = new ActiveSearcherDirectory();
    this.server = require('http').createServer();
    this.io = require('socket.io')(this.server);
    this.io.on('connection', this.setupHandlers());
    this.server.listen(3000, function(err) {
      if (err) throw err;
      console.log('listening on port 3000');
    })
  }
}
