import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spring } from 'react-motion';

import Waypoint from 'Components/Waypoint';
import { loadRoute, sortRoute } from 'Redux/ac/route';

class ListWaypoints extends Component {
  static propTypes = {
    waypoints: PropTypes.array.isRequired,
    loadRoute: PropTypes.func.isRequired
  };

  state = {
    ...defaultState
  };

  componentDidMount() {
    const { loadRoute, waypoints } = this.props;

    if (!waypoints.length) loadRoute();

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { waypoints } = this.props;
    const { selectWaypointId, mouseDownY, shiftY } = this.state;

    return (
      <Fragment>
        {this.getWaypoints(waypoints, selectWaypointId, mouseDownY, shiftY)}
      </Fragment>
    );
  }

  getWaypoints(waypoints, selectWaypointId, mouseDownY, shiftY) {
    return waypoints.map( item => {
      return <Waypoint
        key = {item.id}
        waypoint = {item}
        onMouseDown = {this.handleMouseDown(item.id)}
        style = {style(selectWaypointId, item.id, shiftY)}
        zIndex = {selectWaypointId === item.id ? 999 : '' }
      />;
    });
  }

  handleMouseMove = event => {
    event.preventDefault();

    const { selectWaypointId, mouseDownY, shiftY } = this.state;

    if (!selectWaypointId) return;

    const { sortRoute, waypoints } = this.props;

    if (waypoints.length < 2) return;

    const { pageY } = event;

    this.setState({
      shiftY: !shiftY ? 0.5 : pageY - mouseDownY
    });

    let diffSort = Math.floor(Math.abs(shiftY) / 55);

    if (diffSort >= 1) {
      diffSort = (shiftY > 0) ? diffSort : -diffSort;
      sortRoute(selectWaypointId, diffSort, waypoints);

      this.setState({
        mouseDownY: pageY,
        shiftY: 0
      });
    }
  }

  handleMouseUp = event => {
    event.preventDefault();

    const { selectWaypointId } = this.state;

    if (!selectWaypointId) return;

    return this.setState({
      ...defaultState
    });
  }

  handleMouseDown = selectWaypointId => event => {
    const { nativeEvent, pageY } = event;

    if (nativeEvent.which != 1) {
      return;
    }

    this.setState({
      selectWaypointId,
      mouseDownY: pageY
    });
  }
}

const springConfig = {
  stiffness: 270,
  damping: 50
};

const style = (selectWaypointId, currentSelectId, shiftY) => {
  return {
    scale: spring(selectWaypointId !== currentSelectId ? 1 : 1.02, springConfig),
    translateY: spring(selectWaypointId === currentSelectId ? shiftY : 0, springConfig)
  };
};

const defaultState = {
  selectWaypointId: '',
  mouseDownY: 0,
  shiftY: 0
};

export default connect(state => {
  return {
    waypoints: state.route.entities.toArray()
  };
}, { loadRoute, sortRoute })(ListWaypoints);
