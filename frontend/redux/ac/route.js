import { LOAD_ROUTE, ADD_WAYPOINT, DELETE_WAYPOINT, SORT_ROUTE } from 'constants';

export function loadRoute() {
  return {
    type: LOAD_ROUTE
  };
}

export function addWaypoint(name) {
  return dispatch => {
    if (!name) return;

    const id = Date.now().toString(36).slice(2) + Math.random().toString(36).slice(2);

    dispatch({
      type: ADD_WAYPOINT,
      payload: {
        id, name
      }
    });
  };
}

export function deleteWaypoint(id) {
  return {
    type: DELETE_WAYPOINT,
    payload: {
      id
    }
  };
}

export function sortRoute(id, diffSort, waypoints) {
  return {
    type: SORT_ROUTE,
    payload: {
      id, diffSort, waypoints
    }
  };
}
