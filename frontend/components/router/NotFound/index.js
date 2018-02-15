import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';

import { HOME_PAGE, NOT_FOUND } from 'constants';
import { redirectHome } from 'Redux/ac/redirect';

class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <h1 className = "text-center">{NOT_FOUND}</h1>
        <Row>
          <Col lg = {lgLayout} md = {mdLayout} sm = {smLayout} xs = {12}>
            <Button block onClick = {this.handleClick}>{HOME_PAGE}</Button>
          </Col>
        </Row>
      </Fragment>
    );
  }

  handleClick = event => {
    event.preventDefault();

    const { redirectHome } = this.props;

    redirectHome();
  }
}

const lgLayout = { size: 4, offset: 4 };
const mdLayout = { size: 6, offset: 3 };
const smLayout = { size: 8, offset: 2 };

export default connect(null, { redirectHome })(NotFound);
