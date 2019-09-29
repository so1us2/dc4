import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'Web/home/Root';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

/*
  var container = document.getElementById("root");
  container.replaceChild(container, );
*/

if (module.hot) {
  console.log("Module is hot.");
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default;
    ReactDOM.render(
      <NextRoot />,
      document.getElementById('root')
    )
  })
} else {
  console.log("Module is not hot.");
}
