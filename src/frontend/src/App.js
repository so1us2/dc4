import React, { Component } from 'react';
import axios from 'axios';
import classes from './App.css';



class App extends Component {

  componentDidMount() {
    fetch("http://localhost:1501/api/test", {
      method: 'get',
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      console.log(data);
    });
  }

  sendRequest = () => {
    console.log("Hello world!")
    console.log(this);
    // send a GET request
    axios({
      method: 'get',
      url: 'http://localhost:1501/api/test',
      data: {
        firstName: 'Jake',
        lastName: 'Mirra'
      }
    });
  }

  render () {
    return (
      <div className={classes.App}>
        <h1>Welcome to DC4.</h1>
        <button onClick = {this.sendRequest}>Send a request!</button>
      </div>
    );
  }
}

export default App;
