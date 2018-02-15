import { LOAD_ROUTE, ADD_WAYPOINT, DELETE_WAYPOINT } from 'constants';
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
    default:
      return routeState;
  }
}
