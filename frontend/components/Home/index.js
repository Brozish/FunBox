import React from 'react';
import { Card, CardHeader, CardFooter, CardBody } from 'reactstrap';

import { ABOUT } from 'constants';

const Home = (props) => {
  return (
    <Card>
      <CardHeader className = "text-center">
        <h1>{ABOUT}</h1>
      </CardHeader>
      <CardBody>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}

export default Home;
