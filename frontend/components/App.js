import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import { ConnectedRouter } from 'react-router-redux';
import { Container } from 'reactstrap';

import NotFound from './route/NotFound';
import Home from 'Components/Home';

const App = (props) => {
  return (
    <ConnectedRouter history = {history}>
      <Container>
        <Switch>
          <Redirect exact from = '/' to = '/home' />
          <Route exact path = '/home' component = {Home} />
          <Route component = {NotFound} />
        </Switch>
      </Container>
    </ConnectedRouter>
  );
}

export default App;
