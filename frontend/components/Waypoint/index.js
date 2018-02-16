import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { Motion } from 'react-motion';

import { deleteWaypoint } from 'Redux/ac/route';

class Waypoint extends Component {
  static propTypes = {
    waypoint: PropTypes.object.isRequired,
    deleteWaypoint: PropTypes.func.isRequired
  };

  render() {
    const { waypoint, deleteWaypoint, onMouseDown, style, zIndex } = this.props;

    return (
      <Motion style = {style} key = {waypoint.id}>
        {
          ({ scale, translateY }) =>
            <Fragment>
              <InputGroup onMouseDown = {onMouseDown} style = {transform(scale, translateY, zIndex)}>
                <Input disabled placeholder = {waypoint.name} className = "dragable" />
                <InputGroupAddon addonType = "append">
                  <Button onClick = {this.handleClick(waypoint.id, deleteWaypoint)} >
                    X
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <br />
            </Fragment>
        }
      </Motion>
    );
  }

  handleClick = (id, deleteWaypoint) => event => {
    event.preventDefault();
    deleteWaypoint(id);
  }
}

const transform = (scale, translateY, zIndex) => {
  return {
    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
    zIndex
  }
};

export default connect(null, { deleteWaypoint })(Waypoint);
