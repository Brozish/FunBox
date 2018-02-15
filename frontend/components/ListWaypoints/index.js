import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Waypoint from 'Components/Waypoint';
import { loadRoute } from 'Redux/ac/route';

class ListWaypoints extends Component {
  static propTypes = {
    waypoints: PropTypes.array.isRequired,
    loadRoute: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { loadRoute, waypoints } = this.props;

    if (!waypoints.length) loadRoute();
  }

  render() {
    const { waypoints } = this.props;

    return (
      <Fragment>
        {this.getWaypoints(waypoints)}
      </Fragment>
    );
  }

  getWaypoints(waypoints) {
    return waypoints.map( item => {
      return <Waypoint
        key = {item.id}
        waypoint = {item}
      />;
    });
  }
}

export default connect(state => {
  return {
    waypoints: state.route.entities.toArray()
  };
}, { loadRoute })(ListWaypoints);
