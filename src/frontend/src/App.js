import React, { Component } from 'react';
import classes from './App.css';



class App extends Component {

  socket = new WebSocket('ws://127.0.0.1:39142');

  componentDidMount() {
    this.sendRequest();

    this.socket.onmessage = function(event){
      console.log('Received data: ' + event.data);
    }
    this.socket.onclose = function() {
      console.log('Lost connection!');
    }
  }

  sendRequest = () => {
    console.log("Sending a GET request to the API, /api/test")
    fetch("http://localhost:1501/api/test", {
      method: 'get',
    }).then((response) => {
      console.log("Got a response.");
      console.log(response);
      return response.json();
    }).then((data) => {
      console.log("And as JSON:");
      console.log(data);
    });
  }

  sendWebsocketRequest = () => {
    console.log("Sending a websocket request.");
    this.socket.send(JSON.stringify({'a': 43, 'b': "69!"}));
  }

  render () {
    return (
      <div className={classes.App}>
        <h1>Welcome to DC4.</h1>
        <button onClick = {this.sendRequest}>Send a request!</button>
        <button onClick = {this.sendWebsocketRequest}>Send a websocket request!</button>
      </div>
    );
  }
}

export default App;
