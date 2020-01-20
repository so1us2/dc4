import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import App from 'components/App';

import Config from './client.config.js';

console.log(Config);

ReactDOM.render(<App />, document.getElementById('root'));
