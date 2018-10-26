import { actions as types } from './actions';

const initState = {
  current: null,
  isFetching: false,
  doneAction: null,
  error: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case types.GET_PROFILE_REQUEST:
    case types.CHANGE_PASSWORD_REQUEST:
    case types.UPDATE_PROFILE_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.GET_PROFILE_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        current: null,
      };
    }
    case types.UPDATE_PROFILE_FAILED:
    case types.CHANGE_PASSWORD_FAILED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case types.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'update',
      };
    }
    case types.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'update',
      };
    }
    case types.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'fetch',
        current: action.payload,
      };
    }
    case types.TOGGLE_DONE_ACTION: {
      return { ...state, doneAction: null };
    }
    default:
      return state;
  }
}
