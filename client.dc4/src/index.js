import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './component/App/App.js';
import AppManager from './component/App/AppManager.js';

ReactDOM.render(<App manager={new AppManager()} />, document.getElementById('root'));
