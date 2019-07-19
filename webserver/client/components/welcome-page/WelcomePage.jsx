import React, { Component } from 'react';
import WelcomeHeader from './WelcomeHeader.jsx'
import ButtonPanel from './ButtonPanel.jsx'

import css from './welcome-page.css'

export default class WelcomePage extends Component {

  render() {
    return (
      <div className="DC4Page WelcomePage">
        <WelcomeHeader />
        <ButtonPanel playHumanHandler={this.props.playHumanHandler} playBotHandler={this.props.playBotHandler}/>
      </div>
    )
  }

}
