import React from 'react';
import { Card, CardHeader, CardFooter, CardBody } from 'reactstrap';

import { ABOUT } from 'constants';
import MapRoute from 'Components/MapRoute';
import ListWaypoints from 'Components/ListWaypoints';

const Home = props => {
  return (
    <Card>
      <CardHeader className = "text-center">
        <h1>{ABOUT}</h1>
      </CardHeader>
      <CardBody>
        <MapRoute />
        <br />
        <ListWaypoints />
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}

export default Home;
