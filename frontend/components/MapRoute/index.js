import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { YMaps, Map as YMap, Placemark, Polyline, SearchControl, ZoomControl } from 'react-yandex-maps';
import { connect } from 'react-redux';

import { addWaypoint, getReverseGeocoder } from 'Redux/ac/route';

class MapRoute extends Component {
  render() {
    const { addWaypoint, waypoints, getReverseGeocoder } = this.props;

    return (
      <Card>
        <YMaps>
          <YMap state = {mapState} width = '100%'>
            <ZoomControl />
            <SearchControl
              instanceRef = {this.setSearchControlRef}
              onResultShow = {this.handleChange(addWaypoint)}
              options = {searchControlOptions}
            />
            {this.getPolyline(waypoints)}
            {this.getPlaceMarks(waypoints, getReverseGeocoder)}
          </YMap>
        </YMaps>
      </Card>
    );
  }

  getPolyline(waypoints) {
    if (waypoints.length < 2) return;

    const geometry = { coordinates: waypoints.reduce((prevState, item) => {
      return prevState.push(item.coordinates) && prevState;
    }, [])};

    return <Polyline
      geometry = {geometry}
      options = {defaultPolylineOptions}
    />
  }

  getPlaceMarks(waypoints, getReverseGeocoder) {
    return waypoints.map( item => {
      const geometry = { coordinates: item.coordinates };
      const properties = { balloonContent: item.name };

      return <Placemark key = {item.id}
        geometry = {geometry}
        properties = {properties}
        options = {defaultPlacemarkOptions}
        onDragEnd = {this.handleDrag(item, getReverseGeocoder)}
        instanceRef = {this.setPlaceMarkRef(item.id)}
      />
    });
  }

  setSearchControlRef = ref => {
    this.searchControl = ref;
  }

  setPlaceMarkRef = id => ref => {
    this[`placeMarkRef${id}`] = ref;
  }

  handleChange = addWaypoint => event => {
    const index = event.get('index');

    this.searchControl.getResult(index).then(res => {
      addWaypoint(
        res.properties.get('description'),
        res.geometry.getCoordinates()
      );
    });
  }

  handleDrag = (item, getReverseGeocoder) => event => {
    getReverseGeocoder(item, this[`placeMarkRef${item.id}`].geometry.getCoordinates());
  }
}

const defaultPlacemarkOptions = {
  preset: 'islands#icon',
  iconColor: 'rgb(0, 149, 182)',
  draggable: true
};

const defaultPolylineOptions = {
  strokeColor: 'rgb(0, 0, 0)',
  strokeWidth: 4,
  strokeOpacity: 0.5
};

const mapState = { center: [-13.156330, -72.522962], zoom: 17, controls: [] };

const searchControlOptions = { noPlacemark: true };

export default connect(state => {
  return {
    waypoints: state.route.entities.toArray()
  };
}, { addWaypoint, getReverseGeocoder })(MapRoute);
