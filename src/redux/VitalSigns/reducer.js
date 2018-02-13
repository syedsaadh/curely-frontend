import { actions as types } from './actions';

type State = {
  lists: Array,
  doneAction: string | null,
  isFetching: boolean,
  error: string | null,
};

type Action = {
  type: string,
  payload: any,
};

const initState = {
  lists: [],
  doneAction: null,
  isFetching: false,
  error: null,
};

export default function reducer(state: State = initState, action: Action) {
  switch (action.type) {
    case types.VITAL_SIGNS_ADD_REQUEST:
    case types.VITAL_SIGNS_EDIT_REQUEST:
    case types.VITAL_SIGNS_FETCH_ALL_REQUEST:
    case types.VITAL_SIGNS_DELETE_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.VITAL_SIGNS_ADD_FAILED:
    case types.VITAL_SIGNS_EDIT_FAILED:
    case types.VITAL_SIGNS_FETCH_ALL_FAILED:
    case types.VITAL_SIGNS_DELETE_FAILED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case types.VITAL_SIGNS_FETCH_ALL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        lists: action.payload,
        doneAction: 'fetch',
      };
    }
    case types.VITAL_SIGNS_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'add',
      };
    }
    case types.VITAL_SIGNS_EDIT_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'edit' };
    }
    case types.VITAL_SIGNS_DELETE_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'delete' };
    }
    case types.TOGGLE_DONE_ACTION: {
      return { ...state, doneAction: null };
    }
    default:
      return state;
  }
}
