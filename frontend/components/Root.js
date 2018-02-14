import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'Redux/store';
import App from 'Components/App';

const Root = (props) => {
  return (
    <Provider store = {store}>
      <App />
    </Provider>
  );
}

export default Root;
