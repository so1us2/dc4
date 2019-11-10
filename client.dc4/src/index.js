import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './component/App';

ReactDOM.render(<App manager={new AppManager()} />, document.getElementById('root'));
