import React from 'react';
import ReactDom from 'react-dom';

import Root from 'Components/Root';
import 'Assets/images/favicon.ico';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

ReactDom.render(
  <Root />,
  document.getElementById('container')
);
