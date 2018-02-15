import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

import { deleteWaypoint } from 'Redux/ac/route';

class Waypoint extends Component {
  static propTypes = {
    waypoint: PropTypes.object.isRequired,
    deleteWaypoint: PropTypes.func.isRequired
  };

  render() {
    const { waypoint, deleteWaypoint } = this.props;

    return (
      <Fragment>
        <InputGroup>
          <Input disabled placeholder = {waypoint.name} />
          <InputGroupAddon addonType = "append">
            <Button onClick = {this.handleClick(waypoint.id, deleteWaypoint)} >
              X
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <br />
      </Fragment>
    );
  }

  handleClick = (id, deleteWaypoint) => event => {
    event.preventDefault();
    deleteWaypoint(id);
  }
}

export default connect(null, { deleteWaypoint })(Waypoint);
