export default class DC4WebSocket {
  constructor() {
    this.socket = new WebSocket('ws://127.0.0.1:42069');
    this.channels = {};
    this.socket.onmessage = this.handleMessage;
    this.transactor = new Transactor();
    this.listen("connection", "verify", (data) => {
      this.send({
        channel: "transaction",
        command: "response",
        data: {
          transactionUUID: data.transactionUUID
        }
      });
    });
  }

  send = (data) => {
    this.socket.send(JSON.stringify(data));
  }

  handleMessage = (event) => {
    console.log("Received an message from server! Here it is:");
    event = JSON.parse(event.data);
    console.log(event);
    if(!("channel" in event)) {
      console.log("Didn't have a channel. Can't process.");
      return;
    }
    if(!(event.channel in this.channels)) {
      console.log("Could not find the channel " + event.channel);
      return;
    }
    if(!("command" in event)) {
      console.log("Didn't have a command.  Can't process.");
      return;
    }
    if(!(event.command in this.channels[event.channel])) {
      console.log("This command " + event.command + " doesn't seem to be registered on channel " + event.channel);
      return;
    }
    if(!("data" in event)) {
      console.log("Didn't have data.  Can't process.");
      return;
    }
    this.channels[event.channel][event.command](event.data);
  }

  listen = (channel, command, callback) => {
    console.log("Told to listen on channel " + channel + " for command " + command);
    if (!(channel in this.channels)) {
      this.channels[channel] = {};
    }
    this.channels[channel][command] = callback;
    console.log("Here are the channels now:");
    console.log(this.channels);
  };

  listenForTransaction = (channel, command, callback) => {
    this.transactor.listen(channel, command, callback);
  }

  stopListening = (channel, command) => {
    if (!(channel in this.channels)) {
      return;
    }
    delete this.channels[command];
  }
}

/*
 * Returns JSON to act as payload for transaction responses.
 */
class Transactor {
  constructor() {
    this.channels = {};
  }
  listen = (channel, command, callback) => {
    if (!(channel in this.channels)) {
      this.channels[channel] = {};
    }
    this.channels[channel][command] = callback;
  }
}
