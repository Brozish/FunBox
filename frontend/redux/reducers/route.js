import { LOAD_ROUTE, ADD_WAYPOINT, DELETE_WAYPOINT, SORT_ROUTE } from 'constants';
import { OrderedMap, Record } from 'immutable';

const WaypointRecord = Record({
  id: null,
  name: null
});

const defaultStateRecord = Record({
  entities: new OrderedMap({})
});

const defaultState = new defaultStateRecord();

export default (routeState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ROUTE:
      return routeState;
      break;
    case ADD_WAYPOINT:
      const { id, name } = payload;

      return routeState.setIn(['entities', id], new WaypointRecord({
        id, name
      }));
      break;
    case DELETE_WAYPOINT:
      return routeState.deleteIn(['entities', payload.id]);
      break;
    case SORT_ROUTE:
      const { diffSort, waypoints } = payload;
      const indexSize = waypoints.length - 1;

      const index = waypoints.findIndex(item => {
        return item.id === payload.id;
      });

      let sortedWaypoint = waypoints[index];

      waypoints.splice(index, 1);

      let newIndex = index + +diffSort;

      if (newIndex < 0) newIndex = 0;
      if (newIndex > indexSize) newIndex = indexSize;

      return routeState.setIn(['entities'], waypoints.reduce((previousState, item, index) => {
        if (sortedWaypoint && index === newIndex) {
          previousState = previousState.set(sortedWaypoint.id, new WaypointRecord({
            id: sortedWaypoint.id, name: sortedWaypoint.name
          }));
          sortedWaypoint = false;
        }

        previousState = previousState.set(item.id, new WaypointRecord({
          id: item.id, name: item.name
        }));

        if (sortedWaypoint && index === (indexSize - 1)) {
          previousState = previousState.set(sortedWaypoint.id, new WaypointRecord({
            id: sortedWaypoint.id, name: sortedWaypoint.name
          }));
        }

        return previousState;
      }, new OrderedMap({}) ));
      break;
    default:
      return routeState;
  }
}
